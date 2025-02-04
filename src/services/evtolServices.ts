import { Evtol, Load, User } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/CreateEvtol.dto";
import { CreateLoadDTO } from "../dto/CreateLoad.dto";


export interface EvtolServices {
    createEvtol(data: CreateEvtolDTO): Promise<Evtol>;
    createLoad(data: CreateLoadDTO[]): Promise<void>;
    getEvtolById(id: number): Promise<Evtol>;
    getEvtolLoad(id: number): Promise<Load[]>;
}