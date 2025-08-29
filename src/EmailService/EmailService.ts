import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import { render } from '@react-email/render';
import sanitizeHtml from 'sanitize-html';
import dotenv from 'dotenv';
dotenv.config();


export default class EmailService {
  private transport: Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
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

  public async sendEmail(to: string | string[], subject: string, template: React.ReactElement) {
    const html = sanitizeHtml(await render(template), {
      allowedTags: ['p', 'b', 'i', 'u', 'a', 'ul', 'li', 'strong', 'em', 'div', 'span', 'button'],
      allowedAttributes: { a: ['href'], button: ['style'] },
    });

    const mailOptions: SendMailOptions = {
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
    } catch (error: any) {
      console.error(`Failed to send email to ${to}: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}