import { NextFunction, Request, Response } from "express";
import { EvtolServicesImpl } from "../services/implementation/evtolServices.impl";
import { CreateEvtolDTO } from "../dto/CreateEvtol.dto";
import { CreateLoadDTO } from "../dto/CreateLoad.dto";


export class EvtolController {
    private evtolServices: EvtolServicesImpl;

    constructor(){
        this.evtolServices = new EvtolServicesImpl();
    }

    public createEvtol = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
        try {
            const data = req.body as CreateEvtolDTO;
            const evtol = await this.evtolServices.createEvtol(data);
            res.status(201).json(evtol);

        } catch (error) {
            next(error);
        }
    }


    public loadEvtol = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
        try {
            // const id = parseInt(req.params.id);
            const data = req.body as CreateLoadDTO[];
            await this.evtolServices.createLoad(data);
            res.status(201).json({message: 'Evtol loaded successfully'});

        } catch (error) {
            next(error);
        }
    }


    public getEvtol = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
        try {
            const id = parseInt(req.params.id)
            const evtol = await this.evtolServices.getEvtolById(id);
            res.status(200).json(evtol);

        } catch (error) {
            next(error);
        }
    }


    public getLoad = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const id = parseInt(req.params.id);
            const load = await this.evtolServices.getEvtolLoad(id);
            res.status(200).json(load);
            
        } catch (error) {
            next(error);
        }
    }


    public getAllEvtols = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const allEvtols = await this.evtolServices.getAllEvtols();
            res.status(200).json(allEvtols);
            
        } catch (error) {
            next(error);
        }
    }

}