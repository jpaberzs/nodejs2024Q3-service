import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { TracksService } from '../tracks/services/tracks.service';
import { AlbumService } from '../album/services/album.service';
import { ArtistsService } from '../artists/services/artists.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, TracksService, AlbumService, ArtistsService],
})
export class FavoritesModule {}
