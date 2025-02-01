import { CreateEvtolDTO } from "../dto/CreateEvtol.dto";


export interface EvtolServices {
    createEvtol(data: CreateEvtolDTO): Promise<void>;
}