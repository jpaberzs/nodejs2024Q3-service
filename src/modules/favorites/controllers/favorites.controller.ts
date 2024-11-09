import { Controller, Get } from '@nestjs/common';

@Controller('favs')
export class FavoritesController {
  @Get()
  findAll() {
    return 'Get all Favorites';
  }
}
