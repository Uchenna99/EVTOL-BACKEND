import { Evtol, Load, Medications } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/CreateEvtol.dto";
import { CreateLoadDTO } from "../dto/CreateLoad.dto";


export interface EvtolServices {
    createEvtol(data: CreateEvtolDTO): Promise<Evtol>;
    loadEvtol(id: number, data: CreateLoadDTO[]): Promise<void>;
    checkLoadedItems(id: number): Promise<void>;
    checkAvailableEvtol(): Promise<Evtol[]>;
    batteryCheck(id: number): Promise<number>
}