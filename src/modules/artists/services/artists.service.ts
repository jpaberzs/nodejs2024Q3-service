import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { Artist } from '../interfaces/artist';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { CreateArtistDTO } from '../dto/create-artist.dto';
import { artistData } from 'src/database/database';
import { TracksService } from 'src/modules/tracks/services/tracks.service';
import { AlbumService } from 'src/modules/album/services/album.service';

@Injectable()
export class ArtistsService extends BaseService<Artist> {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumService,
  ) {
    super(artistData);
  }

  createArtist(CreateTrackDTO: CreateArtistDTO) {
    const newTrack: Artist = {
      id: uuidv4(),
      name: CreateTrackDTO.name,
      grammy: CreateTrackDTO.grammy,
    };

    this.items.push(newTrack);

    return newTrack;
  }

  async updateArtist(id: string, updatedFields: Partial<Artist>) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const artist = await this.getById(id);

    if (!artist) throw new NotFoundException('Artist not found');

    const updatedArtist = { ...artist, ...updatedFields };

    Object.assign(artist, updatedArtist);

    return updatedArtist;
  }

  async deleteArtist(id: string) {
    const tracks = await this.tracksService.getAll();
    const albums = await this.albumService.getAll();

    tracks.forEach(async (track) => {
      if (track.artistId === id) {
        await this.tracksService.updateTrack(track.id, { artistId: null });
      }
    });

    albums.forEach(async (album) => {
      if (album.artistId === id) {
        await this.albumService.updateAlbum(album.id, { artistId: null });
      }
    });

    await super.delete(id);
  }
}
