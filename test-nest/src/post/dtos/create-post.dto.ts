import { PostCategory } from "../enums";
export class CreatePostDto{
    title:string;
    slug:string;
    excerpt:string;
    content:string;
    category:PostCategory;
    tags:string[];
    status:boolean;
}