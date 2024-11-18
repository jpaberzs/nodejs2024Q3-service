import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { BaseService } from 'src/common/services/base.service';
import { userData } from 'src/database/database';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(prisma: PrismaService) {
    super(prisma, 'user');
  }
  async createUser(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    };

    try {
      const createdUser = await this.getPrismaModel().create({ data: newUser });

      return this.excludePassword(createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException(error.message);
    }
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

    const updatedUser = await this.getPrismaModel().update({
      where: { id },
      data: {
        password: newPassword,
        version: Number(user.version) + 1,
        updatedAt: Math.floor(Date.now() / 1000),
      },
    });

    Object.assign(user, updatedUser);

    return this.excludePassword(user);
  }

  private excludePassword(user: User): Omit<User, 'password'> {
    const { password, ...result } = user;

    return result;
  }
}
