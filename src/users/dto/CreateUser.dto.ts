import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, min, MinLength } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @MinLength(6)
    @IsString()
    @IsStrongPassword()
    password:string;
}
