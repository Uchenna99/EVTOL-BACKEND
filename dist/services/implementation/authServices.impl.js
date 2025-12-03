"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServicesImpl = void 0;
const react_1 = __importDefault(require("react"));
const db_1 = require("../../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const password_utils_1 = require("../../utils/password.utils");
const EmailService_1 = require("../../EmailService");
const EmailService_2 = __importDefault(require("../../EmailService/EmailService"));
const CustomError_1 = require("../../utils/CustomError");
const http_status_codes_1 = require("http-status-codes");
dotenv_1.default.config();
const emailService = new EmailService_2.default();
class AuthServicesImpl {
    async login(data) {
        const findUser = await db_1.db.user.findUnique({
            where: { email: data.email }
        });
        if (!findUser) {
            throw new CustomError_1.CustomError(401, 'Invalid email or password');
        }
        const passwordVaild = await (0, password_utils_1.comparePassword)(data.password, findUser.password);
        if (!passwordVaild) {
            throw new CustomError_1.CustomError(401, 'Invalid email or password');
        }
        const username = `${findUser.firstName} ${findUser.lastName}`;
        const accessToken = this.generateAccessToken(findUser.id, username, findUser.role);
        return { accessToken };
    }
    async verifyEmail(data) {
        const findUser = await db_1.db.user.findUnique({
            where: { email: data.email }
        });
        if (!findUser) {
            throw new CustomError_1.CustomError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Email not found');
        }
        if (findUser.emailVerified) {
            throw new CustomError_1.CustomError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'This account is already verified');
        }
        if (!findUser.otp || !findUser.otpExpiry) {
            throw new CustomError_1.CustomError(http_status_codes_1.StatusCodes.NOT_FOUND, 'OTP is not available for this email');
        }
        const otpValid = await (0, password_utils_1.comparePassword)(data.otp, findUser.otp);
        if (!otpValid) {
            throw new CustomError_1.CustomError(401, 'Invalid OTP');
        }
        const otpExpired = findUser.otpExpiry < new Date();
        if (otpExpired) {
            throw new CustomError_1.CustomError(401, 'OTP is expired');
        }
        await db_1.db.user.update({
            where: { email: data.email },
            data: {
                emailVerified: true,
                otp: null,
                otpExpiry: null
            }
        });
        const template = react_1.default.createElement(EmailService_1.WelcomeEmail, { name: findUser.firstName + " " + findUser.lastName });
        const response = await emailService.sendEmail(findUser.email, "Welcome!", template);
        if (!response.success) {
            return response;
        }
    }
    generateAccessToken(userId, name, role) {
        return jsonwebtoken_1.default.sign({ id: userId, name: name, role: role }, process.env.JWT_SECRET || '');
    }
    ;
}
exports.AuthServicesImpl = AuthServicesImpl;
