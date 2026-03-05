import pool from '../services/mysql.js';
import { sendEmail } from '../services/email.js';
/**
 * @desc    Submit a new contestant registration
 * @access  Public
 */
export const register = async (req, res) => {
    try {
        const { full_name, stage_name, email, phone, talent_category, bio, photo_url, video_url, social_media } = req.body;
        // Basic validation
        if (!full_name || !email || !talent_category) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        // Generate unique contestant number (starting from 1001)
        const [rows] = await pool.query('SELECT MAX(contestant_number) as max_num FROM contestants');
        const nextNumber = (rows[0].max_num || 1000) + 1;
        // Generate referral code
        const referralCode = stage_name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(2, 5);
        const [result] = await pool.query('INSERT INTO contestants (full_name, stage_name, email, phone, talent_category, bio, photo_url, video_url, social_media, contestant_number, referral_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [full_name, stage_name, email, phone, talent_category, bio, photo_url, video_url, JSON.stringify(social_media), nextNumber, referralCode]);
        res.status(201).json({
            message: 'Registration successful',
            contestant_number: nextNumber,
            referral_code: referralCode
        });
        // Background: Send Confirmation Email
        try {
            await sendEmail(email, 'FGT 2.0 - Application Received! 🎤', `<h1>Welcome to the Stage, ${stage_name}!</h1>
                <p>Your application for FUTO GOT TALENT 2026 has been received.</p>
                <p><strong>Contestant Number:</strong> ${nextNumber}</p>
                <p><strong>Referral Code:</strong> ${referralCode}</p>
                <p>Our team will review your submission and contact you soon.</p>`);
        }
        catch (mailErr) {
            console.error('Email notification failed but registration saved:', mailErr);
        }
    }
    catch (err) {
        console.error('Registration Error:', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Email or Stage Name already registered' });
            return;
        }
        res.status(500).json({ error: 'Server error during registration' });
    }
};
/**
 * @desc    Get all pending contestants
 * @access  Admin
 */
export const getPending = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contestants WHERE status = "Pending" ORDER BY created_at DESC');
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
