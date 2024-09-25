import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
