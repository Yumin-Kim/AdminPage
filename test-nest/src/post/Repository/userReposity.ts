import { Repository , EntityRepository } from "typeorm"

import { Posts } from "../entities/post.entitiy";
import { UserInfo } from "../entities/post.entitiy";

@EntityRepository(Posts)
export class PostRepository extends Repository<Posts>{
    async createPost(postInfo : UserInfo){
        const post = this.create(postInfo)
        return this.save(post)
    }

    async createPosts(postInfos:Array<UserInfo>){
        const posts = this.create(postInfos)
        return this.save(posts)
    }
}