import { CreateAlbumDTO } from './../dto/create-album.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { Album } from '../interfaces/album';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
// import { albumData } from 'src/database/database';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumService extends BaseService<Album> {
  constructor(
    private readonly tracksService: TracksService,
    prisma: PrismaService,
  ) {
    super(prisma, 'album');
  }
  async createAlbum(createAlbumDTO: CreateAlbumDTO) {
    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDTO.name,
      year: createAlbumDTO.year,
      artistId: createAlbumDTO.artistId || null,
    };

    const createdUser = await this.getPrismaModel().create({ data: newAlbum });

    return createdUser;
  }

  async updateAlbum(id: string, updatedFields: Partial<Album>) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const album = await this.getById(id);

    if (!album) throw new NotFoundException('Album not found');

    const updatedAlbum = await this.getPrismaModel().update({
      where: { id },
      data: {
        ...updatedFields,
      },
    });

    Object.assign(album, updatedAlbum);

    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const album = await this.getById(id);

    if (!album) throw new NotFoundException('Album not found');

    const tracks = await this.tracksService.getAll();

    for (const track of tracks) {
      if (track.albumId === id) {
        await this.tracksService.updateTrack(track.id, { albumId: null });
      }
    }

    await this.getPrismaModel().delete({ where: { id } });

    return album;
  }
}
