import { NextFunction, Request, Response } from "express";
import { AdminServicesImpl } from "../services/implementation/adminServices.impl";


export class AdminController {
    private adminServices: AdminServicesImpl;

    constructor(){
        this.adminServices = new AdminServicesImpl();
    }

    public getAllOrders = async (req: Request, res: Response, next: NextFunction)=>{
        const orders = await this.adminServices.getAllOrders();
        res.status(200).json(orders)
    };
}