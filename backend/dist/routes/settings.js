import express from 'express';
import pool from '../services/mysql.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
/**
 * @route   GET /api/settings/phase
 * @desc    Get current event phase and voting status
 * @access  Public
 */
router.get('/phase', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT setting_key, setting_value FROM system_settings WHERE setting_key IN (?, ?)', ['current_phase', 'voting_active']);
        const settings = {};
        rows.forEach((row) => {
            settings[row.setting_key] = row.setting_value;
        });
        res.json({
            phase: parseInt(settings.current_phase || '1'),
            voting_active: settings.voting_active === 'true'
        });
    }
    catch (err) {
        console.error('Error fetching settings:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/**
 * @route   PATCH /api/settings/phase
 * @desc    Update current event phase (Admin Only)
 * @access  Private
 */
router.patch('/phase', protectAdmin, async (req, res) => {
    const body = req.body;
    const phase = body.phase;
    const voting_active = body.voting_active;
    try {
        if (phase) {
            await pool.query('INSERT INTO system_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?', ['current_phase', phase.toString(), phase.toString()]);
        }
        if (voting_active !== undefined) {
            await pool.query('INSERT INTO system_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?', ['voting_active', voting_active.toString(), voting_active.toString()]);
        }
        res.json({ message: 'Settings updated successfully' });
    }
    catch (err) {
        console.error('Error updating settings:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default router;
