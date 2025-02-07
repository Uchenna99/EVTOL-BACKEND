import { IsNotEmpty, IsNumber, IsString } from "class-validator";




export class GetLoadDTO {
    @IsNotEmpty()
    @IsNumber()
    evtolId!: number;

    @IsNotEmpty()
    @IsString()
    orderId!: string;
}