import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
