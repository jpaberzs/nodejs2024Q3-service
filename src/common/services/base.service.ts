import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as isUUID } from 'uuid';

@Injectable()
export class BaseService<T extends { id: string }> {
  protected items: T[] = [];

  getAll(): T[] {
    return this.items;
  }

  getById(id: string): T {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const item = this.items.find((item) => item.id === id);

    if (!item) throw new NotFoundException('User not found');

    return item;
  }

  create(item: Omit<T, 'id'>): T {
    const newItem = { id: uuidv4(), ...item } as T;

    // this.checkRequiredFields(newItem, requiredFields);

    this.items.push(newItem);
    return newItem;
  }

  update(id: string, updatedFields: Partial<T>): T {
    // this.checkRequiredFields(updatedFields, requiredFields);

    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const item = this.getById(id);

    if (!item) throw new NotFoundException('Record from provided id not found');

    Object.assign(item, updatedFields);

    return item;
  }

  delete(id: string): void {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) throw new NotFoundException('Record not found');

    this.items.splice(index, 1);
  }

  // private checkRequiredFields(
  //   data: Partial<T>,
  //   requiredFields: Array<keyof T>,
  // ): void {
  //   const missingFields = requiredFields.filter((field) => !data[field]);
  //   if (missingFields.length > 0) {
  //     throw new BadRequestException(
  //       `Missing required fields: ${missingFields.join(', ')}`,
  //     );
  //   }
  // }
}
