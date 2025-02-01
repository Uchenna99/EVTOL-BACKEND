import { Evtol, Medications } from "@prisma/client";
import { CreateEvtolDTO } from "../../dto/CreateEvtol.dto";
import { EvtolServices } from "../evtolServices";
import { db } from "../../config/db";


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
                    batteryCapacity: data.batteryCapacity
                }
            });
            return newEvtol;
        }
    }


    async loadEvtol(id: number, data: Medications[]): Promise<void> {
        const findEvtol = await db.evtol.findUnique({
            where: {id}
        });
        if(!findEvtol){
            throw new Error(`Could not find the specified evtol`);
        }else{
            await db.evtol.update({
                where: {id},
                data: {
                    loadedItems: {
                        connectOrCreate: data.map(medication => ({
                            where: {id: medication.id},
                            create: {...medication}
                        }))
                    }
                }
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