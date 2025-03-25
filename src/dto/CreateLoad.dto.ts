import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateLoadDTO {
    @IsNotEmpty()
    @IsNumber()
    medicationsId!: number;

    @IsNotEmpty()
    quantity!: number;

    @IsNotEmpty()
    @IsString()
    orderId!: string;
}