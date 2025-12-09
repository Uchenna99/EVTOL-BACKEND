import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateOrderDTO {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsNumber()
    amount!: number;

    @IsNotEmpty()
    @IsString()
    userId!: string;

    @IsNotEmpty()
    @IsString()
    destination!: string;

}