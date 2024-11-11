import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { User } from './../interfaces/user.interface';
import { BaseController } from 'src/common/controllers/base.controller';

@Controller('user')
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  async updatePassword(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updatePassword(id, dto);
  }
}
