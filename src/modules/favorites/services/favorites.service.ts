import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponse } from '../interfaces/interface';
import {
  albumData,
  artistData,
  favoritesData,
  trackData,
} from 'src/database/database';

@Injectable()
export class FavoritesService {
  getAllFavorites(): FavoritesResponse {
    return favoritesData;
  }

  addFavorite(type: 'artist' | 'album' | 'track', item) {
    if (!this.entityExists(type, item.id)) {
      throw new UnprocessableEntityException(
        `${type} with id ${item.id} does not exist`,
      );
    }

    const favorites = this.getFavoritesArray(type);
    if (!favorites.some((fav) => fav.id === item.id)) {
      favorites.push(item);
    }
  }

  removeFavorite(type: 'artist' | 'album' | 'track', id: string) {
    const favorites = this.getFavoritesArray(type);
    const index = favorites.findIndex((fav) => fav.id === id);

    if (index === -1) throw new NotFoundException(`${type} is not a favorite`);

    favorites.splice(index, 1);
  }

  private getFavoritesArray(type: 'artist' | 'album' | 'track') {
    switch (type) {
      case 'artist':
        return favoritesData.artists;
      case 'album':
        return favoritesData.albums;
      case 'track':
        return favoritesData.tracks;
      default:
        throw new Error(`Invalid favorite type: ${type}`);
    }
  }

  private entityExists(
    type: 'artist' | 'album' | 'track',
    id: string,
  ): boolean {
    switch (type) {
      case 'artist':
        return artistData.some((artist) => artist.id === id);
      case 'album':
        return albumData.some((album) => album.id === id);
      case 'track':
        return trackData.some((track) => track.id === id);
      default:
        return false;
    }
  }
}
