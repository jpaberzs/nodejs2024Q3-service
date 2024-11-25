import {
  Controller,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { BaseService } from '../services/base.service';

@Controller()
@UsePipes(new ValidationPipe())
export class BaseController<T extends { id: string }> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get()
  async getAll() {
    return await this.baseService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.baseService.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.baseService.delete(id);
  }
}
