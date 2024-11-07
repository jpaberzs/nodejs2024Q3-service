import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { randomUUID } from 'crypto';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '996aec1c-6b33-4fc9-a1c8-bbaf27a92d18',
      login: 'TEST',
      password: '123456789',
      version: 1,
      createdAt: 1731014180774,
      updatedAt: 1731014180774,
    },
  ];

  private excludePassword(user: User): Omit<User, 'password'> {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  findAll(): Omit<User, 'password'>[] {
    return this.users.map((user) => this.excludePassword(user));
  }

  findOne(id: string): Omit<User, 'password'> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const user = this.users.find((item) => item.id === id);

    if (!user) throw new NotFoundException('User not found');

    return this.excludePassword(user);
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

  update(id: string, updateUserDto: UpdateUserDto): Omit<User, 'password'> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const user = this.users.find((item) => item.id === id);

    if (!user) throw new NotFoundException('User not found');

    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException('Old password is incorrect');

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return this.excludePassword(user);
  }

  remove(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) throw new NotFoundException('User not found');

    this.users.splice(index, 1);
  }
}
