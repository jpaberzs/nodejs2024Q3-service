import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
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

  @Get(':id') async getTrackById(@Param('id') id: string) {
    try {
      const track = await this.tracksService.getById(id);
      if (!track)
        throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: track };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @Post() async createTrack(@Body() createTrackDTO: CreateTrackDTO) {
    try {
      const track = await this.tracksService.createTrack(createTrackDTO);
      return { statusCode: HttpStatus.CREATED, data: track };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Put(':id') async updateTrack(
    @Param('id') id: string,
    @Body() updateTrackDTO: UpdateTrackDTO,
  ) {
    try {
      const track = await this.tracksService.updateTrack(id, updateTrackDTO);
      if (!track)
        throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
      return { statusCode: HttpStatus.OK, data: track };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete(':id') async deleteTrack(@Param('id') id: string) {
    try {
      await this.tracksService.delete(id);
      return { statusCode: HttpStatus.NO_CONTENT };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
