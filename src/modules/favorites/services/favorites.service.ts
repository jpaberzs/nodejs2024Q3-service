import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  albumData,
  artistData,
  favoritesData,
  trackData,
} from 'src/database/database';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllFavorites() {
    const tracks = await this.prisma.favorite.findMany({
      where: { trackId: { not: null } },
      include: { tracks: true },
    });
    const artists = await this.prisma.favorite.findMany({
      where: { artistId: { not: null } },
      include: { artists: true },
    });
    const albums = await this.prisma.favorite.findMany({
      where: { albumId: { not: null } },
      include: { albums: true },
    });

    return {
      artists: artists.map((favorite) => favorite.artists),
      albums: albums.map((favorite) => favorite.albums),
      tracks: tracks.map((favorite) => favorite.tracks),
    };
  }

  async addFavorite(type: 'artist' | 'album' | 'track', item) {
    if (!(await this.entityExists(type, item.id))) {
      throw new UnprocessableEntityException(
        `${type} with id ${item.id} does not exist`,
      );
    }

    const favorite = { artistId: null, albumId: null, trackId: null };

    if (type === 'artist') {
      favorite.artistId = item.id;
    } else if (type === 'album') {
      favorite.albumId = item.id;
    } else if (type === 'track') {
      favorite.trackId = item.id;
    }

    await this.prisma.favorite.create({ data: favorite });
  }

  async removeFavorite(type: 'artist' | 'album' | 'track', id: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: { [`${type}Id`]: id },
    });

    if (!favorite) throw new NotFoundException(`${type} is not a favorite`);

    await this.prisma.favorite.delete({ where: { id: favorite.id } });
  }

  private async entityExists(
    type: 'artist' | 'album' | 'track',
    id: string,
  ): Promise<boolean> {
    let entity;

    if (type === 'artist') {
      entity = await this.prisma.artist.findUnique({ where: { id } });
    } else if (type === 'album') {
      entity = await this.prisma.album.findUnique({ where: { id } });
    } else if (type === 'track') {
      entity = await this.prisma.track.findUnique({ where: { id } });
    }
    return !!entity;
  }
}
