import { NextFunction, Request, Response } from "express";
import { AuthServicesImpl } from "../services/implementation/authServices.impl";
import { LoginDTO } from "../dto/Login.dto";
import { VerifyEmailDTO } from "../dto/VerifyEmail.dto";


export class AuthController {
    private authServices: AuthServicesImpl;

    constructor(){
        this.authServices = new AuthServicesImpl();
    }


    public login = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
        try {
            const data = req.body as LoginDTO;
            const token = await this.authServices.login(data);
            res.status(200).json(token);
            
        } catch (error) {
            next(error);
        }
    }


    public verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
        try {
            const data = req.body as VerifyEmailDTO;
            const response = await this.authServices.verifyEmail(data)
            res.status(200).json({response, message: 'Email verified successfully'});

        } catch (error) {
            next(error);
        }
    }
}