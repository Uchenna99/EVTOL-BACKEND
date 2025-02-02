import { User } from "@prisma/client";
import { LoginDTO } from "../dto/Login.dto";
import { VerifyEmailDTO } from "../dto/VerifyEmail.dto";


export interface AuthServices {
    login(data: LoginDTO): Promise<{accessToken: string}>;
    verifyEmail(data: VerifyEmailDTO): Promise<void>
}