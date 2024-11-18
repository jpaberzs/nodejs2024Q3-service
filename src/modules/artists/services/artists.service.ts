import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { Artist } from '../interfaces/artist';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { CreateArtistDTO } from '../dto/create-artist.dto';
// import { artistData } from 'src/database/database';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { AlbumService } from 'src/modules/album/services/album.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistsService extends BaseService<Artist> {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumService,
    prisma: PrismaService,
  ) {
    super(prisma, 'artist');
  }

  async createArtist(CreateTrackDTO: CreateArtistDTO) {
    const newArtist: Artist = {
      id: uuidv4(),
      name: CreateTrackDTO.name,
      grammy: CreateTrackDTO.grammy,
    };

    const createdArtist = await this.getPrismaModel().create({
      data: newArtist,
    });

    return createdArtist;
  }

  async updateArtist(id: string, updatedFields: Partial<Artist>) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const artist = await this.getById(id);

    if (!artist) throw new NotFoundException('Artist not found');

    const updatedArtist = await this.getPrismaModel().update({
      where: { id },
      data: {
        name: updatedFields.name,
        grammy: updatedFields.grammy,
      },
    });

    Object.assign(artist, updatedArtist);

    return updatedArtist;
  }

  async deleteArtist(id: string) {
    const artist = await this.getById(id);
    if (!artist) throw new NotFoundException('Artist not found');

    const tracks = await this.tracksService.getAll();
    const albums = await this.albumService.getAll();

    for (const track of tracks) {
      if (track.artistId === id) {
        await this.tracksService.updateTrack(track.id, { artistId: null });
      }
    }

    for (const album of albums) {
      if (album.artistId === id) {
        await this.albumService.updateAlbum(album.id, { artistId: null });
      }
    }

    await this.getPrismaModel().delete({ where: { id } });
  }
}
