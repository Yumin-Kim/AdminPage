import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './entities/users.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService ){}

    @Get()
    async getAll() : Promise<User[]>{
        return await this.userService.getAll()
    }

}
