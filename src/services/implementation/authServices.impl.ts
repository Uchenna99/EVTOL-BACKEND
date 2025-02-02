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
                const accessToken = this.generateAccessToken(findUser.id, findUser.firstName, findUser. role);
                return {accessToken};
            }
        }
    }


    verifyEmail(data: VerifyEmailDTO): Promise<User> {
        throw new Error("Method not implemented.");
    }


    generateAccessToken( userId: number, name: string, role: string ): string {
        return jwt.sign({id: userId, name: name, role: role}, process.env.JWT_SECRET || ''
        )
    };
    
}