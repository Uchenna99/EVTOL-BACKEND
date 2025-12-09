import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateOrderItemsDTO } from "./CreateOrderItems.dto";


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

    @IsNotEmpty()
    @IsArray()
    items!: CreateOrderItemsDTO[];

}