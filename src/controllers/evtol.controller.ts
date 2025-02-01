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
            const id = parseInt(req.params.id);
            const data = req.body as CreateLoadDTO[];
            const load = await this.evtolServices.loadEvtol(id, data);
            res.status(201).json(load);

        } catch (error) {
            next(error);
        }
    }

}