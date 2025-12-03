import { jsx as _jsx } from "react/jsx-runtime";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import juice from 'juice';
import ReactDOMServer from 'react-dom/server';
import OtpEmail from './OtpEmail';
dotenv.config();
const testEmail = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: true,
        },
    });
    // Render React component to HTML string
    const reactHtml = ReactDOMServer.renderToString(_jsx(OtpEmail, { otp: '12345' }));
    // Inline CSS using juice
    const inlinedHtml = juice(reactHtml);
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: 'federalagbu@yahoo.com',
        subject: 'Styled Test Email',
        html: inlinedHtml,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    }
    catch (error) {
        console.error('Error:', error);
    }
};
testEmail().catch(console.error);
