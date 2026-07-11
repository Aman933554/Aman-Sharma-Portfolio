require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple in-memory rate limiting map
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

app.post('/api/contact', async (req, res) => {
  try {
    // 1. Rate Limiting
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const userRateLimit = rateLimitMap.get(ip);

    if (userRateLimit) {
      if (now - userRateLimit.lastReset > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
      } else {
        if (userRateLimit.count >= RATE_LIMIT_MAX) {
          return res.status(429).json({ error: 'Too many requests. Please try again later.' });
        }
        userRateLimit.count += 1;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    }

    // 2. Parse and Validate Input
    const { name, email, message } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Sender Identity is required.' });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: 'Return Address must be a valid email.' });
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ error: 'Encrypted Payload (message) is required.' });
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedMessage = message.trim();

    // 3. Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'amansharma846706@gmail.com', // Your email
      subject: 'New Message From Portfolio',
      text: `------------------------\nSender Identity:\n${sanitizedName}\n\nReturn Address:\n${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}\n------------------------`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Transmission Successful.' });
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({ error: 'Transmission Failed. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
