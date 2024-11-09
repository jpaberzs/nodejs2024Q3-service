import { Controller, Get } from '@nestjs/common';

@Controller('artist')
export class ArtistsController {
  @Get()
  findAll() {
    return 'Get all Artists';
  }
}
