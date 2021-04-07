// import { Body, Controller, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreatePostDto } from './dtos/create-post.dto';
// import { Posts } from './entities/post.entitiy';
// import { PostService } from './post.service';
// @Controller('post')
// export class PostController {
//     constructor(
//         private postService:PostService
        
//     ){
//         this.postService = postService;
//     }
//     @Get()
//     async findAll():Promise<Posts[]>{
//         return await this.postService.findAll()
//     }

//     @Post("")
//     async savePost(@Body() post : CreatePostDto) : Promise<string>{
//         await this.postService.savePost(post)
//         return Object.assign({
//             data:{...post},
//             statusCode:201,
//             statusMSG:"save successfly"
//         })
//     }

//     // @Post()
//     // createOne(
//     //     @Body() dto:CreatePostDto
//     // ){
//     //     console.log("POST/post");
        
//     //     console.log(dto);
//     // }

//     // @Delete(":id")
//     // deleteOne(@Param("id") id:number){
//     //     return this.postService.deleteOne(id);
//     // }
// }
