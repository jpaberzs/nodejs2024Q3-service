import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumModule } from './modules/album/album.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    FavoritesModule,
    ArtistsModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
