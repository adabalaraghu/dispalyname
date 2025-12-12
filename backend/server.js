import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '2JPJDG1fsne8pgV.root',
    password: 'j7RVr3MaxocnvuOJ',
    database: 'test',
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to TiDB database');
});

// Add Data
app.post('/add-data', (req, res) => {
    const { ename } = req.body;
    const sql = 'INSERT INTO test (ename) VALUES (?)';
    db.query(sql, [ename], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Data added successfully', id: result.insertId });
    });
});

// View Data
app.get('/view-data', (req, res) => {
    const sql = 'SELECT * FROM test';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
