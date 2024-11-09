import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrackDTO {
  @IsString()
  @IsNotEmpty({ message: 'Track name is required' })
  name: string;

  @IsBoolean()
  grammy: boolean;
}
