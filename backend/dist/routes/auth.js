import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/login', login);
router.post('/logout', protectAdmin, logout);
export default router;
