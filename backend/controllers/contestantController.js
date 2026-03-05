const db = require('../services/mysql');

exports.register = async (req, res) => {
    try {
        const {
            full_name,
            stage_name,
            email,
            phone,
            talent_category,
            bio,
            photo_url,
            video_url,
            social_media
        } = req.body;

        // Basic validation
        if (!full_name || !stage_name || !email || !talent_category) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const query = `
      INSERT INTO contestants 
      (full_name, stage_name, email, phone, talent_category, bio, photo_url, video_url, social_media) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const [result] = await db.execute(query, [
            full_name,
            stage_name,
            email,
            phone || null,
            talent_category,
            bio || null,
            photo_url || null,
            video_url || null,
            JSON.stringify(social_media || {})
        ]);

        res.status(201).json({
            message: 'Application submitted successfully!',
            contestantId: result.insertId
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'This email is already registered.' });
        }
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

exports.getPending = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM contestants WHERE status = "pending"');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pending contestants' });
    }
};
