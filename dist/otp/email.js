import { jsx as _jsx } from "react/jsx-runtime";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { render } from "@react-email/render";
import OtpEmail from "./otpEmail";
import WelcomeEmail from "./welcomeEmail";
dotenv.config();
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Bypass certificate validation
    }
});
export async function sendOtpEmail({ to, subject, otp }) {
    const emailHtml = await render(_jsx(OtpEmail, { otp: otp }));
    try {
        await transporter.sendMail({
            from: `EVTOL <${process.env.SMTP_USER}>`,
            to,
            subject,
            html: emailHtml,
        });
    }
    catch (error) {
        console.error('Email sending failed:', error);
        throw new Error("Sending verification email failed");
    }
}
export async function welcomeEmail({ to, subject, name }) {
    const emailHtml = await render(_jsx(WelcomeEmail, { name: name }));
    await transporter.sendMail({
        from: `EVTOL <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: emailHtml,
    });
}
