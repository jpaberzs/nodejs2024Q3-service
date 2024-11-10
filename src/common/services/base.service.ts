import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as isUUID } from 'uuid';

@Injectable()
export class BaseService<T extends { id: string }> {
  protected items: T[] = [];

  constructor(items: T[]) {
    this.items = items;
  }

  async getAll(): Promise<T[]> {
    return this.items;
  }

  async getById(id: string): Promise<T> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const item = this.items.find((item) => item.id === id);

    if (!item) throw new NotFoundException('Record not found');

    return item;
  }

  async create(createDto: object): Promise<T> {
    const newItem = { id: uuidv4(), ...createDto } as T;

    this.items.push(newItem);

    return newItem;
  }

  async update(id: string, updateDto: object): Promise<T> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const item = this.getById(id);

    if (!item) throw new NotFoundException('Record from provided id not found');

    Object.assign(item, updateDto);

    return item;
  }

  async delete(id: string): Promise<void> {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) throw new NotFoundException('Record not found');

    this.items.splice(index, 1);
  }
}
