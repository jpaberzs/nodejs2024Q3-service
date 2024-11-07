import { Controller, Get } from '@nestjs/common';

@Controller('track')
export class TracksController {
  @Get()
  findAll() {
    return 'Get all tracks';
  }
}
