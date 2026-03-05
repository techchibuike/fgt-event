import express, { Request, Response } from 'express';
import pool from '../services/mysql.js';

const router = express.Router();

/**
 * @route   POST /api/contestants/register
 * @desc    Submit a new contestant registration
 * @access  Public
 */
router.post('/register', async (req: Request, res: Response) => {
    const {
        full_name, stage_name, email, phone,
        talent_category, bio, photo_url, video_url, social_media
    } = req.body;

    try {
        // 1. Check if registration is allowed (Phase Control)
        const [settings]: any = await pool.query(
            "SELECT setting_value FROM system_settings WHERE setting_key = 'current_phase'"
        );

        if (settings[0]?.setting_value !== '1') {
            return res.status(403).json({ error: 'Registration is currently closed.' });
        }

        // 2. Insert into MySQL
        const [result]: any = await pool.query(
            `INSERT INTO contestants 
            (full_name, stage_name, email, phone, talent_category, bio, photo_url, video_url, social_media, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
            [
                full_name, stage_name, email, phone,
                talent_category, bio, photo_url, video_url,
                JSON.stringify(social_media)
            ]
        );

        // 3. Generate a contestant number/referral code (Optional post-processing)
        const contestantId = result.insertId;
        const referralCode = `FGT2${contestantId}${Math.random().toString(36).substring(7).toUpperCase()}`;

        await pool.query(
            "UPDATE contestants SET contestant_number = ?, referral_code = ? WHERE id = ?",
            [1000 + contestantId, referralCode, contestantId]
        );

        res.status(201).json({
            message: 'Registration successful',
            contestantId,
            referralCode
        });

    } catch (err: any) {
        console.error('Registration Error:', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'This email is already registered.' });
        }
        res.status(500).json({ error: 'Server error during registration.' });
    }
});

/**
 * @route   GET /api/contestants
 * @desc    Get all contestants (Filtered by status for public view)
 * @access  Public
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        let query = 'SELECT id, stage_name, talent_category, photo_url, status, total_votes FROM contestants';
        const params: any[] = [];

        if (status) {
            query += ' WHERE status = ?';
            params.push(status);
        } else {
            // By default, public only sees those who are at least screened
            query += " WHERE status NOT IN ('Pending', 'Eliminated')";
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (err: any) {
        console.error('Fetch Error:', err.message);
        res.status(500).json({ error: 'Failed to fetch contestants.' });
    }
});

export default router;
