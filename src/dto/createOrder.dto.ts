import { Load } from "@prisma/client";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";


export class CreateOrderDTO {

    @IsNotEmpty()
    @IsNumber()
    evtolId!: number;

    @IsNotEmpty()
    @IsNumber()
    userId!: string;
}