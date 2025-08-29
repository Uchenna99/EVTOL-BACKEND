import { User } from "@prisma/client";
import { LoginDTO } from "../dto/Login.dto";
import { VerifyEmailDTO } from "../dto/VerifyEmail.dto";
import { EmailResponse } from "../EmailService";


export interface AuthServices {
    login(data: LoginDTO): Promise<{accessToken: string}>;
    verifyEmail(data: VerifyEmailDTO): Promise<EmailResponse | void>
}