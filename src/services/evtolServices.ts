import { Evtol, Load, Order, User } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/CreateEvtol.dto";
import { CreateLoadDTO } from "../dto/CreateLoad.dto";
import { GetLoadDTO } from "../dto/GetLoad.dto";
import { getAvailableEvtolsDTO } from "../dto/GetEvtol.dto";


export interface EvtolServices {
    createEvtol(data: CreateEvtolDTO): Promise<Evtol>;
    createLoad(data: CreateLoadDTO[]): Promise<void>;
    getEvtolById(id: number): Promise<Evtol>;
    getAllEvtols(): Promise<Evtol[]>
    getEvtolLoad(data: GetLoadDTO): Promise<Load[]>;
    getAvailableEvtols (data: getAvailableEvtolsDTO): Promise<Evtol[]>;
}