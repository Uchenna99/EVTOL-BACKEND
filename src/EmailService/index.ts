import { SendMailOptions } from 'nodemailer';


export { WelcomeEmail } from './WelcomeEmail';

export type EmailResponse = {
  success: boolean;
  result?: any;
  error?: string;
};

export type EmailOptions = SendMailOptions;