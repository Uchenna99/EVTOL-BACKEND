"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const juice_1 = __importDefault(require("juice"));
const server_1 = __importDefault(require("react-dom/server"));
const OtpEmail_1 = __importDefault(require("./OtpEmail"));
const react_1 = __importDefault(require("react"));
dotenv_1.default.config();
const testEmail = async () => {
    const transporter = nodemailer_1.default.createTransport({
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
    const reactHtml = server_1.default.renderToString(react_1.default.createElement(OtpEmail_1.default, { otp: '12345' }));
    // Inline CSS using juice
    const inlinedHtml = (0, juice_1.default)(reactHtml);
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
