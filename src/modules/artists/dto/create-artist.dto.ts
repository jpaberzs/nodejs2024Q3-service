import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
