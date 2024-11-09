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
import { BaseService } from 'src/common/services/base.service';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService extends BaseService<User> {
  createUser(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.items.push(newUser);

    return this.excludePassword(newUser);
  }

  async updatePassword(
    id: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const user = await this.getById(id);

    if (!user) throw new NotFoundException('User not found');

    if (user.password !== oldPassword)
      throw new ForbiddenException('Old password is incorrect');

    const updatedUser: User = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    Object.assign(user, updatedUser);

    return this.excludePassword(user);
  }

  private excludePassword(user: User): Omit<User, 'password'> {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
