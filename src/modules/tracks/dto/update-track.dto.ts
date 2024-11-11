import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @IsOptional()
  duration: number;
}
