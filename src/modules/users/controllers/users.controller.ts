import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  NotFoundException,
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
    const user = await this.usersService.createUser(createUserDto);

    return user;
  }

  @Get(':id') async getUserById(@Param('id') id: string) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  @Put(':id')
  async updatePassword(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.usersService.updatePassword(id, dto);
  }
}
