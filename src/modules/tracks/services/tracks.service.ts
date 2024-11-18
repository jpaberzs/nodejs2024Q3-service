import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { Track } from '../interfaces/track';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { CreateTrackDTO } from '../dto/create-track.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TracksService extends BaseService<Track> {
  constructor(prisma: PrismaService) {
    super(prisma, 'track');
  }

  async createTrack(createTrackDTO: CreateTrackDTO) {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDTO.name,
      artistId: createTrackDTO.artistId || null,
      albumId: createTrackDTO.albumId || null,
      duration: createTrackDTO.duration,
    };

    const createdTrack = await this.getPrismaModel().create({ data: newTrack });

    return createdTrack;
  }
  async updateTrack(id: string, updatedFields: Partial<Track>) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const track = await this.getById(id);

    if (!track) throw new NotFoundException('Track not found');

    const updatedTrack = await this.getPrismaModel().update({
      where: { id },
      data: {
        ...updatedFields,
      },
    });

    return updatedTrack;
  }
  async deleteTrack(id: string) {
    const track = await this.getById(id);

    if (!track) throw new NotFoundException('Track not found');

    await this.getPrismaModel().delete({ where: { id } });

    return track;
  }
}
