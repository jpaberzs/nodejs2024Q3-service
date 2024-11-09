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
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  // createUser(createUserDto: CreateUserDto) {
  //   if (!createUserDto.login || !createUserDto.password)
  //     throw new BadRequestException('Misiing login or password');

  //   const newUser: User = {
  //     id: randomUUID(),
  //     login: createUserDto.login,
  //     password: createUserDto.password,
  //     version: 1,
  //     createdAt: Date.now(),
  //     updatedAt: Date.now(),
  //   };

  //   return this.excludePassword(newUser);
  // }

  updatePassword(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const user = this.getById(id);

    if (!user) throw new NotFoundException('User not found');

    if (user.password !== oldPassword)
      throw new ForbiddenException('Old password is incorrect');

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

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
