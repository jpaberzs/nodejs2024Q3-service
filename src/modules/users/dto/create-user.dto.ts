import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty({ message: 'Login must be between 3 and 20 characters long' })
  login: string;

  @IsString()
  @Length(8, 100)
  @IsNotEmpty()
  password: string;
}
