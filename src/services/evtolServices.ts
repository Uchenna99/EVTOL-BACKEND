import { Evtol, Load } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/CreateEvtol.dto";
import { CreateLoadDTO } from "../dto/CreateLoad.dto";


export interface EvtolServices {
    createEvtol(data: CreateEvtolDTO): Promise<Evtol>;
    loadEvtol(id: number, data: CreateLoadDTO[]): Promise<void>;
    getEvtolById(id: number): Promise<Evtol>;
    getEvtolLoad(id: number): Promise<Load[]>;
    batteryCheck(id: number): Promise<number>
}