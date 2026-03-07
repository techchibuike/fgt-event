import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

dotenv.config();

// Since we are using ES Modules/TS, we need to handle __dirname manually if needed
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

import pool from './services/mysql.js';
import supabase from './services/supabase.js';
import authRoutes from './routes/auth.js';
import contestantRoutes from './routes/contestants.js';
import settingsRoutes from './routes/settings.js';
import paymentRoutes from './routes/payments.js';

app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://fgt.alphoch.com',
        'https://www.fgt.alphoch.com',
        'https://fgt-event.vercel.app',
        /\.vercel\.app$/
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contestants', contestantRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/health', async (req: Request, res: Response) => {
    let mysqlStatus = 'DOWN';
    let supabaseStatus = 'DOWN';

    try {
        const connection = await pool.getConnection();
        mysqlStatus = 'UP';
        connection.release();
    } catch (err: any) {
        console.error('MySQL health check failed:', err.message);
    }

    try {
        const { data, error } = await supabase.from('votes').select('*', { count: 'exact', head: true });
        if (!error) supabaseStatus = 'UP';
        else console.error('Supabase error:', error.message);
    } catch (err: any) {
        console.error('Supabase health check failed:', err.message);
    }

    res.status(200).json({
        status: 'UP',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        databases: {
            mysql: mysqlStatus,
            supabase: supabaseStatus
        }
    });
});

// Basic error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
