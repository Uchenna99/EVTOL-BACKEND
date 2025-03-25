import { Load } from "@prisma/client";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";


export class CreateOrderDTO {

    @IsNotEmpty()
    @IsNumber()
    userId!: string;
}