import bcrypt from 'bcryptjs';
import pool from '../services/mysql.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Seed Admin User
 * Usage: node dist/scripts/seedAdmin.js
 */
const seedAdmin = async () => {
    const username = 'admin';
    const password = 'FGTAdmin@2026'; // Change this in production!
    const fullName = 'Lead Organizer';
    const email = 'admin@fgt.alphoch.com';

    try {
        console.log('Seeding admin user...');

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Insert into database
        const [result]: any = await pool.query(
            'INSERT INTO admins (username, password_hash, email, full_name) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = ?',
            [username, passwordHash, email, fullName, passwordHash]
        );

        console.log('Admin user seeded successfully!');
        process.exit(0);
    } catch (err: any) {
        console.error('Seeding Failed:', err.message);
        process.exit(1);
    }
};

seedAdmin();
