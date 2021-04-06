import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/users.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService ){}

    @Get()
    getAll() : User[]{
        return this.userService.getAll()
    }

    @Get("/:id")
    getOne(@Param("id") userId : number) : User{
        return this.userService.getOne(userId)
    }

    @Post()
    create(@Body() userData:CreateUserDto){
        return this.userService.create(userData)
    }

    @Delete("/:id")
    remove(@Param("id") userId :number){
        return this.userService.deleteOne(userId)
    }

    @Patch("/:id")
    patch(@Param("id") userId : number , @Body() updateData :UpdateUserDto){
        return this.userService.update(userId,updateData)
    }

}
