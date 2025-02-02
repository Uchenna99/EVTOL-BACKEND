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
                }
            });
            return newEvtol;
        }
    }
    
    
    async loadEvtol( data: CreateLoadDTO[]): Promise<void> {
        const findEvtol = await db.evtol.findUnique({
            where: {id: data[0].evtolId}
        });
        if(!findEvtol){
            throw new Error(`Error finding evtol with id: ${data[0].evtolId}`);
        }else{
            await db.load.deleteMany({
                where: {evtolId: findEvtol.id}
            })
            .then(async ()=> {
                await db.load.createMany({
                    data
                })
            });
        }
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
        const findLoad = await db.load.findMany({});
        return findLoad;
    }


    batteryCheck(id: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

}