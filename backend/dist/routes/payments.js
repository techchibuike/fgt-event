import express from 'express';
import { initializeVotePayment, paystackWebhook } from '../controllers/paystackController.js';
const router = express.Router();
// Initialize vote payment from frontend
router.post('/vote/initialize', initializeVotePayment);
// Webhook listener for Paystack
router.post('/paystack/webhook', express.json({ type: 'application/json' }), paystackWebhook);
export default router;
