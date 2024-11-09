import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Login must be a string' })
  @Length(1, 20, { message: 'Login must be between 1 and 20 characters long' })
  @IsNotEmpty({ message: 'Login should not be empty' })
  login: string;

  @IsString({ message: 'Password must be a string' })
  @Length(8, 100, {
    message: 'Password must be between 8 and 100 characters long',
  })
  @IsNotEmpty({ message: 'Password must be between 8 and 100 characters long' })
  password: string;
}
