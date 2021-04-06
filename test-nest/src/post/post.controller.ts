import { Body, Controller, Delete, Get, Param,Post, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

    constructor(
        // @InjectRepository(Post)
        private readonly postService:PostService
    ){}

    @Get()
    async getMany(){
        // const data = await this.postRepository.getMany()
        return await this.postService.getmany()
    }

    @Get(":id")
    getOne(@Param("id",ParseIntPipe) id : number){
        return this.postService.editOne(id)
    }

    @Post()
    createOne(
        @Body() dto:CreatePostDto
    ){
        console.log("POST/post");
        
        console.log(dto);
    }

    @Delete(":id")
    deleteOne(@Param("id") id:number){
        return this.postService.deleteOne(id);
    }
}
