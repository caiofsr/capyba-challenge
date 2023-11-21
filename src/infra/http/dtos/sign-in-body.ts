import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SigninBody {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  password: string;
}
