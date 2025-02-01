import { EvtolModel, EvtolState, Medications } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUppercase, Length } from "class-validator";


export class CreateEvtolDTO {
    @IsNotEmpty()
    @IsString()
    @Length(10, 100)
    serialNumber!: string;

    @IsNotEmpty()
    model!: EvtolModel

    @IsOptional()
    loadedItems!: Medications[];

    @IsNotEmpty()
    @IsNumber()
    batteryCapacity!: number;
}