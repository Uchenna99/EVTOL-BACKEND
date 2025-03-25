import { Evtol, Load, Medications, Order, User } from "@prisma/client";
import { CreateEvtolDTO } from "../../dto/CreateEvtol.dto";
import { EvtolServices } from "../evtolServices";
import { db } from "../../config/db";
import { CreateLoadDTO } from "../../dto/CreateLoad.dto";
import { getAvailableEvtolsDTO } from "../../dto/GetEvtol.dto";


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
                    maxWeight: data.maxWeight,
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
    
    
    async getEvtolLoad(orderId: string): Promise<Load[]> {
        const findOrder = await db.load.findMany({
            where: { orderId }
        })
        return findOrder;
    }
    
    
    async getAllEvtols(): Promise<Evtol[]> {
        const allEvtols = await db.evtol.findMany({});
        return allEvtols;
    }


    async getAvailableEvtols(data: getAvailableEvtolsDTO): Promise<Evtol[]> {
        return await db.evtol.findMany({
            where: {
                batteryCapacity: {gt: 25},
                maxWeight: {gte: data.weight}
            }
        })
        
    }
    
}