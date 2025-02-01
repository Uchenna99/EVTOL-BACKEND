import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateLoadDTO {
    @IsNotEmpty()
    @IsNumber()
    medicationsId!: number;

    @IsNotEmpty()
    quantity!: number;

    @IsNotEmpty()
    evtolId!: number;
}