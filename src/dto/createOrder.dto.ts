import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateOrderDTO {

    @IsNotEmpty()
    @IsNumber()
    userId!: string;
}