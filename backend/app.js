const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const mysql = require('./services/mysql');
const supabase = require('./services/supabase');

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', async (req, res) => {
    let mysqlStatus = 'DOWN';
    let supabaseStatus = 'DOWN';

    try {
        const connection = await mysql.getConnection();
        mysqlStatus = 'UP';
        connection.release();
    } catch (err) {
        console.error('MySQL health check failed:', err.message);
    }

    try {
        const { data, error } = await supabase.from('votes').select('*', { count: 'exact', head: true });
        if (!error) supabaseStatus = 'UP';
        else console.error('Supabase error:', error.message);
    } catch (err) {
        console.error('Supabase health check failed:', err.message);
    }

    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        databases: {
            mysql: mysqlStatus,
            supabase: supabaseStatus
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
