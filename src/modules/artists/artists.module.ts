import { Module } from '@nestjs/common';
import { ArtistsService } from './services/artists.service';
import { ArtistsController } from './controllers/artists.controller';
import { TracksService } from '../tracks/services/tracks.service';
import { AlbumService } from '../album/services/album.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, TracksService, AlbumService, PrismaService],
})
export class ArtistsModule {}
