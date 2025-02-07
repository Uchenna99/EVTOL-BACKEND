import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateLoadDTO {
    @IsNotEmpty()
    @IsNumber()
    medicationsId!: number;

    @IsNotEmpty()
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    evtolId!: number;

    @IsNotEmpty()
    @IsString()
    orderId!: string;
}