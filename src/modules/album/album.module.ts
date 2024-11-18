import { Module } from '@nestjs/common';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';
import { TracksService } from '../tracks/services/tracks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TracksService, PrismaService],
})
export class AlbumModule {}
