import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entities/users.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepositort : Repository<User>
  ){}

  getAll(): Promise< User[] >{
    return this.userRepositort.find({
      select:["birth"],
      // join:{leftJoinAndSelect:{
      //   group:""
      // }}, 
      relations:["test.groups"],
      skip:0,take:20
    })
  }


}