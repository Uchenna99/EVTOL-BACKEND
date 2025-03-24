import { IsNotEmpty } from "class-validator";


export class getAvailableEvtolsDTO {
    @IsNotEmpty()
    weight!: number;

    @IsNotEmpty()
    batteryCapacity!: number;

}