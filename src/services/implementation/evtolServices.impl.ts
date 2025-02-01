import { Evtol, Load, Medications } from "@prisma/client";
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
                }
            });
            return newEvtol;
        }
    }
    
    
    async loadEvtol(id: number, data: CreateLoadDTO[]): Promise<void> {
        const findEvtol = await db.evtol.findUnique({
            where: {id}
        });
        if(!findEvtol){
            throw new Error(`Error finding evtol with id: ${id}`);
        }else{
            await db.load.deleteMany({
                where: {evtolId: id}
            })
            .then(async ()=> {
                await db.load.createMany({
                    data
                })
            });
        }
    }


    checkLoadedItems(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }


    checkAvailableEvtol(): Promise<Evtol[]> {
        throw new Error("Method not implemented.");
    }


    batteryCheck(id: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

}