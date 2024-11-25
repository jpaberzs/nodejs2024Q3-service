import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { AlbumService } from 'src/modules/album/services/album.service';
import { ArtistsService } from 'src/modules/artists/services/artists.service';
import { validate as isUUID } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  async getFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const track = await this.tracksService.getById(id, 422);

    this.favoritesService.addFavorite('track', track);

    return { status: 'Track added to favorites' };
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    this.favoritesService.removeFavorite('track', id);
  }

  @Post('/album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const album = await this.albumsService.getById(id, 422);

    this.favoritesService.addFavorite('album', album);

    return { status: 'Album added to favorites' };
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    this.favoritesService.removeFavorite('album', id);
  }

  @Post('/artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const artist = await this.artistsService.getById(id, 422);

    this.favoritesService.addFavorite('artist', artist);

    return { status: 'Artist added to favorites' };
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavorites(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    this.favoritesService.removeFavorite('artist', id);
  }
}
