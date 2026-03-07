import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AdminPayload {
    id: number;
    username: string;
}

// Extend Express Request type to include admin
declare global {
    namespace Express {
        interface Request {
            admin?: AdminPayload;
        }
    }
}

/**
 * @desc    Protect admin routes (verify JWT cookie)
 */
export const protectAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.admin_token;

        if (!token) {
            res.status(401).json({ error: 'Not authorized, no token provided' });
            return;
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'development_secret_key'
        ) as AdminPayload;

        // Attach admin info to request
        req.admin = decoded;
        next();

    } catch (err: any) {
        console.error('Auth Middleware Error:', err.message);
        res.status(401).json({ error: 'Not authorized, token invalid or expired' });
    }
};
