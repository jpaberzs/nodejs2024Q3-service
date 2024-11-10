import { Album } from 'src/modules/album/interfaces/album';
import { Artist } from 'src/modules/artists/interfaces/artist';
import { Track } from 'src/modules/tracks/interfaces/track';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
