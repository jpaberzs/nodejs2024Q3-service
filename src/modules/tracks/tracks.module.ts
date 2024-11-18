import { Module } from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { TracksController } from './controllers/tracks.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, PrismaService],
})
export class TracksModule {}
