import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Sender Identity is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Return Address must be a valid email.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Encrypted Payload (message) is required.' }, { status: 400 });
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedMessage = message.trim();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS?.replace(/"/g, ''), // Remove quotes if present
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'amansharma846706@gmail.com', // User's email
      subject: 'New Message From Portfolio',
      text: `------------------------\nSender Identity:\n${sanitizedName}\n\nReturn Address:\n${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}\n------------------------`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Transmission Successful.' });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Transmission Failed. Please try again.' }, { status: 500 });
  }
}
