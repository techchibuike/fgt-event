import jwt from 'jsonwebtoken';
/**
 * @desc    Protect admin routes (verify JWT cookie)
 */
export const protectAdmin = (req, res, next) => {
    try {
        const token = req.cookies.admin_token;
        if (!token) {
            res.status(401).json({ error: 'Not authorized, no token provided' });
            return;
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development_secret_key');
        // Attach admin info to request
        req.admin = decoded;
        next();
    }
    catch (err) {
        console.error('Auth Middleware Error:', err.message);
        res.status(401).json({ error: 'Not authorized, token invalid or expired' });
    }
};
