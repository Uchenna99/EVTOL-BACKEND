"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServicesImpl = void 0;
const db_1 = require("../../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const password_utils_1 = require("../../utils/password.utils");
dotenv_1.default.config();
class AuthServicesImpl {
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield db_1.db.user.findUnique({
                where: { email: data.email }
            });
            if (!findUser) {
                throw new Error('Invalid email or password');
            }
            else {
                const passwordVaild = yield (0, password_utils_1.comparePassword)(data.password, findUser.password);
                if (!passwordVaild) {
                    throw new Error('Invalid email or password');
                }
                else {
                    const username = `${findUser.firstName} ${findUser.lastName}`;
                    const accessToken = this.generateAccessToken(findUser.id, username, findUser.role);
                    return { accessToken };
                }
            }
        });
    }
    verifyEmail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield db_1.db.user.findUnique({
                where: { email: data.email }
            });
            if (!findUser) {
                throw new Error('Email not found');
            }
            if (findUser.emailVerified) {
                throw new Error('This account is already verified');
            }
            if (!findUser.otp || !findUser.otpExpiry) {
                throw new Error('OTP is not available for this email');
            }
            const otpValid = yield (0, password_utils_1.comparePassword)(data.otp, findUser.otp);
            if (!otpValid) {
                throw new Error('Invalid OTP');
            }
            const otpExpired = findUser.otpExpiry < new Date();
            if (otpExpired) {
                throw new Error('OTP is expired');
            }
            const updateUser = yield db_1.db.user.update({
                where: { email: data.email },
                data: {
                    emailVerified: true,
                    otp: null,
                    otpExpiry: null
                }
            });
        });
    }
    generateAccessToken(userId, name, role) {
        return jsonwebtoken_1.default.sign({ id: userId, name: name, role: role }, process.env.JWT_SECRET || '');
    }
    ;
}
exports.AuthServicesImpl = AuthServicesImpl;
