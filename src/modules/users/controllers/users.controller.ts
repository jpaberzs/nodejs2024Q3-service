import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  HttpStatus,
  HttpException,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { User } from './../interfaces/user.interface';
import { BaseController } from 'src/common/controllers/base.controller';
import { isUUID } from 'class-validator';

@Controller('user')
export class UsersController extends BaseController<User> {
  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return user;
    // try {
    // } catch (error) {
    //   console.error('Error creating user:', error);
    //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    // }
  }

  @Get(':id') async getUserById(@Param('id') id: string) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
    // try {
    // } catch (error) {
    //   console.error('Error fetching user:', error);
    //   throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }

  @Put(':id')
  async updatePassword(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.usersService.updatePassword(id, dto);
  }
}
