import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BaseController } from 'src/common/controllers/base.controller';
import { Track } from '../interfaces/track';
import { TracksService } from '../services/tracks.service';
import { UpdateTrackDTO } from '../dto/update-track.dto';
import { CreateTrackDTO } from '../dto/create-track.dto';

@Controller('track')
export class TracksController extends BaseController<Track> {
  constructor(private readonly tracksService: TracksService) {
    super(tracksService);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDTO): Promise<Track> {
    return this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDTO,
  ): Promise<Track> {
    return await this.tracksService.updateTrack(id, updateTrackDto);
  }
}
