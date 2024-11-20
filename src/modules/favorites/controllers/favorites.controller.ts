import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
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
    const favorites = await this.favoritesService.getAllFavorites();
    return favorites;
    // try {
    // } catch (error) {
    //   throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }

  @Post('/track/:id')
  async addTrackToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const track = await this.tracksService.getById(id, 422);

    this.favoritesService.addFavorite('track', track);

    return { status: 'Track added to favorites' };
  }

  @Delete(':type/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavorites(
    @Param('type') type: 'artist' | 'album' | 'track',
    @Param('id') id: string,
  ) {
    await this.favoritesService.removeFavorite(type, id);
    return { statusCode: HttpStatus.NO_CONTENT };
    // try {
    // } catch (error) {
    //   if (error instanceof NotFoundException) {
    //     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    //   }
    //   throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }

  @Post('/album/:id')
  async addAlbumToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const album = await this.albumsService.getById(id, 422);

    this.favoritesService.addFavorite('album', album);

    return { status: 'Album added to favorites' };
  }

  @Post('/artist/:id')
  async addArtistToFavorites(@Param('id') id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const artist = await this.artistsService.getById(id, 422);

    this.favoritesService.addFavorite('artist', artist);

    return { status: 'Artist added to favorites' };
  }
}
