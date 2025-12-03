import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateOrderDTO {

    @IsNotEmpty()
    @IsString()
    userId!: string;

    @IsNotEmpty()
    @IsNumber()
    evtolId!: number;

    @IsNotEmpty()
    @IsString()
    reference!: string;

}