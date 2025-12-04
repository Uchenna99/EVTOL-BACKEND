import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class CreatUserDTO {
    @IsNotEmpty()
    @IsString()
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @IsNotEmpty()
    @IsString()
    @Length(11, 14)
    phoneNumber!: string;

    @IsNotEmpty()
    age!: string;

    @IsString()
    occupation!: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 25)
    password!: string;
}