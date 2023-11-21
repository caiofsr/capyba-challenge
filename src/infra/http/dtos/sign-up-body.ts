import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
