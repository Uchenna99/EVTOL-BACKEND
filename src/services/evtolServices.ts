import { Evtol } from "@prisma/client";
import { CreateEvtolDTO } from "../dto/CreateEvtol.dto";
import { getAvailableEvtolsDTO } from "../dto/GetEvtol.dto";


export interface EvtolServices {
    createEvtol(data: CreateEvtolDTO): Promise<Evtol>;
    getEvtolById(id: number): Promise<Evtol>;
    getAllEvtols(): Promise<Evtol[]>
    getAvailableEvtols (data: getAvailableEvtolsDTO): Promise<Evtol[]>;
}