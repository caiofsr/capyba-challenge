import { SignUpBody } from '../dtos/sign-up-body';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignUpUseCase } from '@application/use-cases/auth/sign-up';
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';

@Controller('v1/auth')
export class AuthController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  async signup(
    @Body() { email, name, password }: SignUpBody,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    await this.signUpUseCase.execute({ email, name, password, file });

    return;
  }
}
