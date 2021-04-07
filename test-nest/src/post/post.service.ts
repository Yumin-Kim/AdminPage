import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import { CreatePostDto } from './dtos/create-post.dto';
import { Posts } from './entities/post.entitiy';


@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Posts) private postRepository : Repository<Posts>,
    ){
        this.postRepository = postRepository;
    }
    // private posts:Posts[] = [];

    findAll() : Promise<Posts[]>{
        return this.postRepository.find();
        // return this.posts;
    }

    findOne(id:number){
        return this.postRepository.findOne({id}) 
    }

    async savePost(post:CreatePostDto) : Promise<void>{
        await this.postRepository.save(post);
    }

    async deletePost(id:number) : Promise<void>{
        await this.postRepository.delete({id})
    }
    
    // getmany() {
    //     return {ok : "getmany"} 
    // }

    // editOne(id:number){
    //     return {ok : "editOne"} 
    // }
    
    // deleteOne(id:number){
    //     return {ok : "deleteOne"} 
    // }
}
