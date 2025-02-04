import { Load } from "@prisma/client";
import { IsArray, IsNotEmpty } from "class-validator";


export class CreateOrderDTO {

    @IsNotEmpty()
    evtolId!: number;
}