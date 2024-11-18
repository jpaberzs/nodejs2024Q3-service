import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  HttpStatus,
  HttpException,
  Get,
} from '@nestjs/common';
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
    try {
      const user = await this.usersService.createUser(createUserDto);
      return { statusCode: HttpStatus.CREATED, data: user };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id') async getUserById(@Param('id') id: string) {
    try {
      const user = await this.findOne(id);
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: user };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updatePassword(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updatePassword(id, dto);
  }
}
