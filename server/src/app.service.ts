import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectRepository } from '@nestjs/typeorm';
import { createConnection, Repository } from 'typeorm';
import { User } from './entity/User.entity';


//주요 동작만 구현
//req , res 이러한 매개변수를 사용하여 코딩하는것은 좋지 않다.?

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User)
    private useRepository : Repository<User>,
  ){}

  async add (user:User) :Promise<void>{
    await this.useRepository.save(user);
  }
  findOne(id: string): Promise<User> {
    return (
      this.useRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'profile')
        .where('user.id = :id', { id })
        .getOne()
    );
  }
  getHello(): string {
    return "Get REquest";
  }

  postHello(): string {
    return 'Hello Post';
  }
}
