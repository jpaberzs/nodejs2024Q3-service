import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
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
    return this.baseService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.baseService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: Omit<T, 'id'>) {
    return this.baseService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<T>) {
    return this.baseService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    this.baseService.delete(id);
  }
}
