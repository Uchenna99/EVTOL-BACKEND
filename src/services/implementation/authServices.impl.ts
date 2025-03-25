import { User } from "@prisma/client";
import { LoginDTO } from "../../dto/Login.dto";
import { VerifyEmailDTO } from "../../dto/VerifyEmail.dto";
import { AuthServices } from "../authServices";
import { db } from "../../config/db";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { comparePassword } from "../../utils/password.utils";

dotenv.config();


export class AuthServicesImpl implements AuthServices {

    async login(data: LoginDTO): Promise<{accessToken: string}> {
        const findUser = await db.user.findUnique({
            where: {email: data.email}
        });
        if (!findUser){
            throw new Error('Invalid email or password');
        }else{
            const passwordVaild = await comparePassword(data.password, findUser.password);
            if(!passwordVaild){
                throw new Error('Invalid email or password');
            }else{
                const username = `${findUser.firstName} ${findUser.lastName}`
                const accessToken = this.generateAccessToken(findUser.id, username, findUser. role);
                return {accessToken};
            }
        }
    }


    async verifyEmail(data: VerifyEmailDTO): Promise<void> {
        const findUser = await db.user.findUnique({
            where: {email: data.email}
        });
        if(!findUser){
            throw new Error('Email not found');
        }
        if(findUser.emailVerified){
            throw new Error('This account is already verified');
        }
        if(!findUser.otp || !findUser.otpExpiry){
            throw new Error('OTP is not available for this email');
        }
        const otpValid = await comparePassword(data.otp, findUser.otp);
        if(!otpValid){
            throw new Error('Invalid OTP');
        }
        const otpExpired = findUser.otpExpiry < new Date();
        if(otpExpired){
            throw new Error('OTP is expired');
        }
        const updateUser = await db.user.update({
            where: {email:data.email},
            data: {
                emailVerified: true,
                otp: null,
                otpExpiry: null
            }
        });
    }


    generateAccessToken( userId: string, name: string, role: string ): string {
        return jwt.sign({id: userId, name: name, role: role}, process.env.JWT_SECRET || ''
        )
    };
    
}