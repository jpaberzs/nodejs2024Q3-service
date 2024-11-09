import { Controller, Get } from '@nestjs/common';

@Controller('album')
export class AlbumController {
  @Get()
  findAll() {
    return 'Get all Album';
  }
}
