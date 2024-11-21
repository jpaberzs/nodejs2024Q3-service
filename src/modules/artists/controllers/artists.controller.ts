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
import { ArtistsService } from '../services/artists.service';
import { Artist } from '../interfaces/artist';
import { CreateArtistDTO } from '../dto/create-artist.dto';
import { UpdateArtistDTO } from '../dto/update-artist.dto';

@Controller('artist')
export class ArtistsController extends BaseController<Artist> {
  constructor(private readonly artistsService: ArtistsService) {
    super(artistsService);
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDTO): Promise<Artist> {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDTO,
  ): Promise<Artist> {
    return await this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.artistsService.deleteArtist(id);
  }
}
