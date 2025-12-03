"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const render_1 = require("@react-email/render");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class EmailService {
    constructor() {
        this.transport = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            pool: true,
            maxConnections: 5,
            maxMessages: 100,
        });
    }
    async sendEmail(to, subject, template) {
        const html = (0, sanitize_html_1.default)(await (0, render_1.render)(template), {
            allowedTags: ['p', 'b', 'i', 'u', 'a', 'ul', 'li', 'strong', 'em', 'div', 'span', 'button'],
            allowedAttributes: { a: ['href'], button: ['style'] },
        });
        const mailOptions = {
            from: `"${process.env.SMTP_APPNAME}" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            text: html.replace(/<[^>]+>/g, ''), // Plain text fallback
        };
        try {
            const result = await this.transport.sendMail(mailOptions);
            console.log(`Email sent to ${to}: ${subject}`);
            return { success: true, result };
        }
        catch (error) {
            console.error(`Failed to send email to ${to}: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
}
exports.default = EmailService;
