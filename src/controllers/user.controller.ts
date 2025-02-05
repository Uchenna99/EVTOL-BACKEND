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
            const user = await this.userServices.createUser(data);
            res.status(201).json(user);
            
        } catch (error) {
            next(error);
        }
    }


    public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
        try {
            const id = parseInt(req.params.id);
            const user = await this.userServices.getUserById(id);
            res.status(200).json(user);
            
        } catch (error) {
            
        }
    }


    public getMeds = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const allMeds = await this.userServices.getAllMeds();
            res.status(200).json(allMeds);

        } catch (error) {
            next(error);
        }
    }

}