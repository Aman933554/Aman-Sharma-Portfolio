import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiting map
// Keys are IP addresses, values are request counts and timestamps
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const userRateLimit = rateLimitMap.get(ip);

    if (userRateLimit) {
      if (now - userRateLimit.lastReset > RATE_LIMIT_WINDOW_MS) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, lastReset: now });
      } else {
        if (userRateLimit.count >= RATE_LIMIT_MAX) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        userRateLimit.count += 1;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    }

    // 2. Parse and Validate Input
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Sender Identity is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Return Address must be a valid email.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Encrypted Payload (message) is required.' }, { status: 400 });
    }

    // Sanitize input
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
      to: 'amansharma846706@gmail.com',
      subject: 'New Message From Portfolio',
      text: `------------------------\nSender Identity:\n${sanitizedName}\n\nReturn Address:\n${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}\n------------------------`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Transmission Successful.' }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Transmission Failed. Please try again.' },
      { status: 500 }
    );
  }
}
