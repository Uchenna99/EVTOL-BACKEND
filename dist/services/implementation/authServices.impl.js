import { jsx as _jsx } from "react/jsx-runtime";
import { db } from "../../config/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { comparePassword } from "../../utils/password.utils";
import { WelcomeEmail } from "../../EmailService";
import EmailService from "../../EmailService/EmailService";
import { CustomError } from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";
dotenv.config();
const emailService = new EmailService();
export class AuthServicesImpl {
    async login(data) {
        const findUser = await db.user.findUnique({
            where: { email: data.email }
        });
        if (!findUser) {
            throw new CustomError(401, 'Invalid email or password');
        }
        const passwordVaild = await comparePassword(data.password, findUser.password);
        if (!passwordVaild) {
            throw new CustomError(401, 'Invalid email or password');
        }
        const username = `${findUser.firstName} ${findUser.lastName}`;
        const accessToken = this.generateAccessToken(findUser.id, username, findUser.role);
        return { accessToken };
    }
    async verifyEmail(data) {
        const findUser = await db.user.findUnique({
            where: { email: data.email }
        });
        if (!findUser) {
            throw new CustomError(StatusCodes.NOT_FOUND, 'Email not found');
        }
        if (findUser.emailVerified) {
            throw new CustomError(StatusCodes.BAD_REQUEST, 'This account is already verified');
        }
        if (!findUser.otp || !findUser.otpExpiry) {
            throw new CustomError(StatusCodes.NOT_FOUND, 'OTP is not available for this email');
        }
        const otpValid = await comparePassword(data.otp, findUser.otp);
        if (!otpValid) {
            throw new CustomError(401, 'Invalid OTP');
        }
        const otpExpired = findUser.otpExpiry < new Date();
        if (otpExpired) {
            throw new CustomError(401, 'OTP is expired');
        }
        await db.user.update({
            where: { email: data.email },
            data: {
                emailVerified: true,
                otp: null,
                otpExpiry: null
            }
        });
        const template = _jsx(WelcomeEmail, { name: findUser.firstName + " " + findUser.lastName });
        const response = await emailService.sendEmail(findUser.email, "Welcome!", template);
        if (!response.success) {
            return response;
        }
    }
    generateAccessToken(userId, name, role) {
        return jwt.sign({ id: userId, name: name, role: role }, process.env.JWT_SECRET || '');
    }
    ;
}
