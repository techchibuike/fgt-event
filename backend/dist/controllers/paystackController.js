import crypto from 'crypto';
import pool from '../services/mysql.js';
import supabase from '../services/supabase.js';
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const VOTE_COST_NGN = 100; // 100 Naira per vote
/**
 * @desc    Initialize a payment for votes
 * @route   POST /api/payments/vote/initialize
 * @access  Public
 */
export const initializeVotePayment = async (req, res) => {
    try {
        const { contestant_id, contestant_name, vote_quantity, voter_email } = req.body;
        if (!contestant_id || !vote_quantity || !voter_email) {
            res.status(400).json({ error: 'Missing required parameters' });
            return;
        }
        // 1. Verify Phase is active for voting
        const [settings] = await pool.query("SELECT setting_value FROM system_settings WHERE setting_key = 'voting_active'");
        if (settings[0]?.setting_value !== 'true') {
            res.status(403).json({ error: 'Voting is currently closed.' });
            return;
        }
        // 2. Calculate Amount in Kobo (Paystack expects Kobo)
        const amountInKobo = vote_quantity * VOTE_COST_NGN * 100;
        // 3. Generate internal reference
        const reference = `VOTE-${contestant_id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        // 4. Call Paystack API
        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: voter_email,
                amount: amountInKobo,
                reference: reference,
                callback_url: `${req.protocol}://${req.get('host')}/vote-success`,
                metadata: {
                    type: 'VOTE',
                    contestant_id,
                    contestant_name,
                    vote_quantity,
                }
            }),
        });
        const data = await response.json();
        if (!data.status) {
            throw new Error(data.message);
        }
        res.json({
            authorization_url: data.data.authorization_url,
            reference: data.data.reference
        });
    }
    catch (err) {
        console.error('Paystack Init Error:', err.message);
        res.status(500).json({ error: 'Failed to initialize payment.' });
    }
};
/**
 * @desc    Paystack Webhook listener
 * @route   POST /api/payments/paystack/webhook
 * @access  Public (Secured by signature verify)
 */
export const paystackWebhook = async (req, res) => {
    try {
        // 1. Validate Event Signature
        const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');
        if (hash !== req.headers['x-paystack-signature']) {
            res.status(401).send('Invalid signature');
            return;
        }
        const event = req.body;
        // 2. Handle Successful Charge
        if (event.event === 'charge.success') {
            const { reference, amount, customer, metadata } = event.data;
            if (metadata.type === 'VOTE') {
                const amountPaidNGN = amount / 100;
                // Get current phase
                const [phaseRow] = await pool.query("SELECT setting_value FROM system_settings WHERE setting_key = 'current_phase'");
                const currentPhase = parseInt(phaseRow[0]?.setting_value || '4');
                // A. Insert into MySQL (Financial Truth)
                const [result] = await pool.query(`INSERT IGNORE INTO votes 
                    (contestant_id, contestant_name, vote_quantity, voting_round, voter_email, amount_paid, paystack_reference) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`, [metadata.contestant_id, metadata.contestant_name, metadata.vote_quantity, currentPhase, customer.email, amountPaidNGN, reference]);
                // Check if it was actually inserted (not a duplicate webhook ping)
                if (result.affectedRows > 0) {
                    // B. Increment total votes in MySQL
                    await pool.query('UPDATE contestants SET total_votes = total_votes + ? WHERE id = ?', [metadata.vote_quantity, metadata.contestant_id]);
                    // C. Push to Supabase for Realtime UI updates
                    if (supabase) {
                        try {
                            await supabase.from('votes').insert([{
                                    contestant_id: metadata.contestant_id,
                                    contestant_name: metadata.contestant_name,
                                    vote_quantity: metadata.vote_quantity,
                                    voting_round: currentPhase
                                }]);
                        }
                        catch (supaErr) {
                            console.error('Supabase Sync Failed, but MySQL recorded successfully:', supaErr);
                        }
                    }
                }
            }
        }
        res.sendStatus(200);
    }
    catch (err) {
        console.error('Webhook Error:', err.message);
        res.sendStatus(500);
    }
};
