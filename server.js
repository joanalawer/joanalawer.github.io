const express = require('express');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

// Server static files from your project
app.use('/static', express.static(path.join(__dirname, 'static')));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  app.get('/volunteer.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'volunteer.html'));
  });
  
  app.get('/analysis.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'analysis.html'));
  });
  
  app.get('/pending.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pending.html'));
  });
  
// PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432
});

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'smtp.gmail.com'
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
    }
});

// Create table if it doesn't exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mesaage TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

pool.query(createTableQuery).catch(err => console.error('Table creation error:', err));

// Handle form submission
app.post('/api/contact', async (req, res) => {
    const { fullName, email, message } = req.body;

    // Validate input
    if (!fullName || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
     
    try {
        // Save to PostgeSQL
        const insertQuery = `
            INSERT INTO contact_submissions (full_name, email, message)
            VALUES ($1, $2, $3)
            RETURN id;
        `;
        const result = await pool.query(insertQuery, [fullName, email, message]);

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIPT_EMAIL,
            subject: `New Contact Form Submission from ${fullName}`,
            html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Submission ID: ${result.rows[0].id}</small></p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Form submitted successfully',
            id: result.rows[0].id
        });
    } catch (error) {
        console.error('Error processing form:', error);
        res.status(500).json({ error: 'Failed tp process form submission' });
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });