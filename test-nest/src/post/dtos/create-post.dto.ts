import { IsEmail, IsNotEmpty } from "class-validator";
import { PostCategory } from "../enums";

export class CreatePostDto{

    @IsNotEmpty()    
    slug:string;
    
    @IsNotEmpty()    
    description:string;

}