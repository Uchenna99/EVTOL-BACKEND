import { EvtolModel, EvtolState } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString, IsUppercase, Length } from "class-validator";


export class CreateEvtolDTO {
    @IsNotEmpty()
    @IsString()
    @Length(10, 100)
    serialNumber!: string;

    @IsNotEmpty()
    model!: EvtolModel

    @IsNotEmpty()
    image!: string;

    @IsNotEmpty()
    maxWeight!: number;
}