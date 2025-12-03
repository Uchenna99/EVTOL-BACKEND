"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpEmail = sendOtpEmail;
exports.welcomeEmail = welcomeEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const render_1 = require("@react-email/render");
const otpEmail_1 = __importDefault(require("./otpEmail"));
const react_1 = __importDefault(require("react"));
const welcomeEmail_1 = __importDefault(require("./welcomeEmail"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
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
async function sendOtpEmail({ to, subject, otp }) {
    const emailHtml = await (0, render_1.render)(react_1.default.createElement(otpEmail_1.default, { otp: otp }));
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
async function welcomeEmail({ to, subject, name }) {
    const emailHtml = await (0, render_1.render)(react_1.default.createElement(welcomeEmail_1.default, { name: name }));
    await transporter.sendMail({
        from: `EVTOL <${process.env.SMTP_USER}>`,
        to,
        subject,
        html: emailHtml,
    });
}
