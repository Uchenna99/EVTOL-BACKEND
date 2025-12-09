import { NextFunction, Request, Response } from "express";
import { UserServicesImpl } from "../services/implementation/userServices.impl";
import { CreatUserDTO } from "../dto/CreatUser.dto";
import { CreateOrderDTO } from "../dto/createOrder.dto";



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
            const id = req.params.id;
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


    // public createOrder = async (req: Request, res: Response, next: NextFunction)=>{
    //     try {
    //         const data = req.body as CreateOrderDTO;
    //         const newOrder = await this.userServices.createOrder(data);
    //         res.status(201).json(newOrder);
            
    //     } catch (error) {
    //         next(error);
    //     }
    // }


    public getUserOrders = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const id = req.params.id
            const orders = await this.userServices.getUserOrders(id);
            res.status(200).json(orders);

        } catch (error) {
            next(error);
        }
    };

}