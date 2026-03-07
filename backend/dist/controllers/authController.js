import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../services/mysql.js';
/**
 * @desc    Login admin and issue JWT via secure cookie
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }
        // Find admin in database
        const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
        const admin = rows[0];
        if (!admin) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        // Update last login
        await pool.query('UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [admin.id]);
        // Generate JWT
        const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET || 'development_secret_key', { expiresIn: '8h' });
        // Send token via secure cookie
        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: true, // MUST be true for SameSite='none'
            sameSite: 'none', // Allows cross-origin (localhost -> fgt.alphoch.com)
            maxAge: 8 * 60 * 60 * 1000 // 8 hours
        });
        res.json({
            message: 'Login successful',
            user: {
                id: admin.id,
                username: admin.username,
                full_name: admin.full_name
            }
        });
    }
    catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ error: 'Server error during login' });
    }
};
/**
 * @desc    Logout admin (clear cookie)
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = (req, res) => {
    res.clearCookie('admin_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.json({ message: 'Logged out successfully' });
};
