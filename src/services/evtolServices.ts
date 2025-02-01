import { Evtol, Medications } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/CreateEvtol.dto";


export interface EvtolServices {
    createEvtol(data: CreateEvtolDTO): Promise<Evtol>;
    loadEvtol(id: number, data: Medications[]): Promise<void>;
    checkLoadedItems(id: number): Promise<void>;
    checkAvailableEvtol(): Promise<Evtol[]>;
    batteryCheck(id: number): Promise<number>
}