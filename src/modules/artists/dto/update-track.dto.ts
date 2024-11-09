import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrackDTO {
  @IsString()
  @IsNotEmpty({ message: 'Track name is required' })
  name: string;

  @IsBoolean()
  grammy: boolean;
}
