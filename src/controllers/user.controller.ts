import { NextFunction, Request, Response } from "express";
import { UserServicesImpl } from "../services/implementation/userServices.impl";
import { CreatUserDTO } from "../dto/CreatUser.dto";



export class UserController {
    userServices: UserServicesImpl;

    constructor(){
        this.userServices = new UserServicesImpl();
    }


    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
        try {
            const data = req.body as CreatUserDTO;
            await this.userServices.createUser(data);
        } catch (error) {
            
        }
    }

}