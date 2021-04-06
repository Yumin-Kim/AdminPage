import { Injectable , NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entitiy';


@Injectable()
export class PostService {

    private posts:Post[] = [];

    getAll() : Post[]{
        return this.posts;
    }

    getOne(id:number){
        return {ok :"getOne" } 
    }

    
    getmany() {
        return {ok : "getmany"} 
    }

    editOne(id:number){
        return {ok : "editOne"} 
    }
    
    deleteOne(id:number){
        return {ok : "deleteOne"} 
    }
}
