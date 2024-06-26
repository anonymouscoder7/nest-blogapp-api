import {  IsNotEmpty, IsString} from "class-validator";

export class CreateBlogDto{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    details:string;

    @IsNotEmpty()
    @IsString()
    category: string;
}
