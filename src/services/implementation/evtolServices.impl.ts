import { Evtol, Load, Medications, User } from "@prisma/client";
import { CreateEvtolDTO } from "../../dto/CreateEvtol.dto";
import { EvtolServices } from "../evtolServices";
import { db } from "../../config/db";
import { CreateLoadDTO } from "../../dto/CreateLoad.dto";


export class EvtolServicesImpl implements EvtolServices {
    
    async createEvtol(data: CreateEvtolDTO): Promise<Evtol> {
        const findEvtol = await db.evtol.findUnique({
            where: {serialNumber: data.serialNumber}
        });
        if(findEvtol){
            throw new Error(`Evtol with serial number ${data.serialNumber} already exists`);
        }else{
            const newEvtol = await db.evtol.create({
                data: {
                    serialNumber: data.serialNumber,
                    model: data.model,
                    image: data.image
                }
            });
            return newEvtol;
        }
    }
    
    
    async createLoad( data: CreateLoadDTO[]): Promise<void> {
        await db.load.createMany({
            data
        });
    }


    async getEvtolById(id: number): Promise<Evtol> {
        const findEvtol = await db.evtol.findUnique({
            where: {id}
        });
        if(!findEvtol){
            throw new Error(`Evtol with id: ${id} not found`);
        }
        return findEvtol;
    }


    async getEvtolLoad(id: number): Promise<Load[]> {
        const findLoad = await db.load.findMany({
            where: {evtolId: id}
        });
        return findLoad;
    }

}