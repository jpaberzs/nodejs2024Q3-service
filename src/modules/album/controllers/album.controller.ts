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
import { Album } from '../interfaces/album';
import { AlbumService } from '../services/album.service';
import { CreateAlbumDTO } from '../dto/create-album.dto';
import { UpdateAlbumDTO } from '../dto/update-album.dto';

@Controller('album')
export class AlbumController extends BaseController<Album> {
  constructor(private readonly albumService: AlbumService) {
    super(albumService);
  }

  @Post()
  create(@Body() createAlbumDTO: CreateAlbumDTO) {
    return this.albumService.createAlbum(createAlbumDTO);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDTO,
  ): Promise<Album> {
    return await this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.albumService.deleteAlbum(id);
  }
}
