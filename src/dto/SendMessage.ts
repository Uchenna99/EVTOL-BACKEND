import { IsNotEmpty, IsString } from "class-validator";


export class sendMessageDTO {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    message!: string;

    email!: string;
}