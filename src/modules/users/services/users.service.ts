import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    if (!isUUID(id)) throw new BadRequestException('Invalid user ID');

    const user = this.users.find((item) => item.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto): User {
    if (!createUserDto.login || !createUserDto.password)
      throw new BadRequestException('Misiing login or password');

    const newUser: User = {
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const user = this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException('Old password is incorrect');

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  remove(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) throw new NotFoundException('User not found');

    this.users.splice(index, 1);
  }
}
