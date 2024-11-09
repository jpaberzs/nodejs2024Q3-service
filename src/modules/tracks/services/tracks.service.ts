import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { Track } from '../interfaces/track';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { CreateTrackDTO } from '../dto/create-track.dto';

@Injectable()
export class TracksService extends BaseService<Track> {
  createTrack(CreateTrackDTO: CreateTrackDTO) {
    const newTrack: Track = {
      id: uuidv4(),
      name: CreateTrackDTO.name,
      artistId: CreateTrackDTO.artistId,
      albumId: CreateTrackDTO.albumId,
      duration: CreateTrackDTO.duration,
    };

    this.items.push(newTrack);

    return newTrack;
  }

  async updateTrack(id: string, updatedFields: Partial<Track>) {
    if (!isUUID(id)) throw new BadRequestException('Invalid UUID');

    const track = await this.getById(id);

    if (!track) throw new NotFoundException('Track not found');

    const updatedTrack = { ...track, ...updatedFields };

    Object.assign(track, updatedTrack);

    return updatedTrack;
  }
}
