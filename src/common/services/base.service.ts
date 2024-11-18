import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
// import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4, validate as isUUID } from 'uuid';

@Injectable()
export class BaseService<T extends { id: string }> {
  constructor(
    public readonly prisma: PrismaService,
    private readonly model: keyof PrismaService,
  ) {}

  protected getPrismaModel() {
    return this.prisma[this.model] as unknown as {
      findMany: () => Promise<T[]>;
      findUnique: (args: { where: { id: string } }) => Promise<T | null>;
      create: (args: { data: Partial<T> }) => Promise<T>;
      update: (args: { where: { id: string }; data: Partial<T> }) => Promise<T>;
      delete: (args: { where: { id: string } }) => Promise<T>;
    };
  }

  async getAll(): Promise<T[]> {
    return await this.getPrismaModel().findMany();
  }

  async getById(id: string, statusCode?: number): Promise<T> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const item = await this.getPrismaModel().findUnique({ where: { id } });

    if (statusCode === 422) {
      if (!item) throw new UnprocessableEntityException('Item not found');
    } else {
      if (!item) throw new NotFoundException('Record not found');
    }

    return item;
  }

  async create(createDto: T): Promise<T> {
    return await this.getPrismaModel().create({ data: createDto });
  }

  async update(id: string, updateDto: object): Promise<T> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const item = this.getById(id);

    if (!item) throw new NotFoundException('Record from provided id not found');

    Object.assign(item, updateDto);

    return await this.getPrismaModel().update({
      where: { id },
      data: updateDto,
    });
  }

  async delete(id: string): Promise<void> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const item = await this.getById(id);

    if (!item) throw new NotFoundException('Record not found');

    this.getPrismaModel().delete({ where: { id } });
  }
}
