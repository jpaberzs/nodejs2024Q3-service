import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { Track } from '../interfaces/track';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { CreateTrackDTO } from '../dto/create-track.dto';
import { trackData } from 'src/database/database';

@Injectable()
export class TracksService extends BaseService<Track> {
  constructor() {
    super(trackData);
  }

  createTrack(CreateTrackDTO: CreateTrackDTO) {
    const newTrack: Track = {
      id: uuidv4(),
      name: CreateTrackDTO.name,
      artistId: CreateTrackDTO.artistId || null,
      albumId: CreateTrackDTO.albumId || null,
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
