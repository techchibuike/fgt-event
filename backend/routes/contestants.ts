import express, { Request, Response } from 'express';
import pool from '../services/mysql.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/contestants/register
 * @desc    Submit a new contestant registration
 * @access  Public
 */
router.post('/register', async (req: Request, res: Response) => {
    const {
        full_name, stage_name, email, phone,
        talent_category, bio, photo_url, video_url,
        state_of_origin, department, social_media
    } = req.body;

    try {
        // 1. Check if registration is allowed (Phase Control)
        const [settings]: any = await pool.query(
            "SELECT setting_value FROM system_settings WHERE setting_key = 'current_phase'"
        );

        if (settings[0]?.setting_value !== '1') {
            res.status(403).json({ error: 'Registration is currently closed.' });
            return;
        }

        // 2. Insert into MySQL
        const [result]: any = await pool.query(
            `INSERT INTO contestants 
            (full_name, stage_name, email, phone, talent_category, bio, photo_url, video_url, state_of_origin, department, social_media, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
            [
                full_name, stage_name, email, phone,
                talent_category, bio, photo_url, video_url,
                state_of_origin, department,
                JSON.stringify(social_media)
            ]
        );

        const contestantId = result.insertId;
        const contestantNumber = 1000 + contestantId;
        const referralCode = `${stage_name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 5)}`;

        await pool.query(
            "UPDATE contestants SET contestant_number = ?, referral_code = ? WHERE id = ?",
            [contestantNumber, referralCode, contestantId]
        );

        res.status(201).json({
            message: 'Registration successful',
            contestant_number: contestantNumber,
            referral_code: referralCode
        });

    } catch (err: any) {
        console.error('Registration Error:', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'This email or stage name is already registered.' });
            return;
        }
        res.status(500).json({ error: 'Server error during registration.' });
    }
});

// Public list (limited info)
router.get('/', async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        let query = 'SELECT id, stage_name, talent_category, photo_url, status, total_votes FROM contestants';
        const params: any[] = [];

        if (status) {
            query += ' WHERE status = ?';
            params.push(status);
        } else {
            query += " WHERE status NOT IN ('Pending', 'Eliminated')";
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: 'Failed to fetch contestants.' });
    }
});

// Admin Only: Get all contestants (detailed)
router.get('/admin/all', protectAdmin, async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contestants ORDER BY created_at DESC');
        res.json(rows);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Only: Update contestant status
router.patch('/:id/status', protectAdmin, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, rejection_reason } = req.body;

        await pool.query(
            'UPDATE contestants SET status = ?, rejection_reason = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?',
            [status, rejection_reason || null, id]
        );

        res.json({ message: 'Contestant status updated successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
