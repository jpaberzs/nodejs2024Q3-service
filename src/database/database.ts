import { Album } from 'src/modules/album/interfaces/album';
import { Artist } from 'src/modules/artists/interfaces/artist';
import { FavoritesResponse } from 'src/modules/favorites/interfaces/interface';
import { Track } from 'src/modules/tracks/interfaces/track';
import { User } from 'src/modules/users/interfaces/user.interface';

export const albumData: Album[] = [];
export const trackData: Track[] = [];
export const userData: User[] = [];
export const artistData: Artist[] = [];
export const favoritesData: FavoritesResponse = {
  artists: [],
  albums: [],
  tracks: [],
};
