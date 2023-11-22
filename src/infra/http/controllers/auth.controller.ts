import { SigninBody } from '../dtos/sign-in-body';
import { SignUpBody } from '../dtos/sign-up-body';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignUpUseCase } from '@application/use-cases/auth/sign-up';
import { SignInUseCase } from '@application/use-cases/auth/sign-in';
import { ConfirmEmailUseCase } from '@application/use-cases/auth/confirm-email';
import { Body, Controller, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private signUpUseCase: SignUpUseCase,
    private signInUseCase: SignInUseCase,
    private confirmEmailUseCase: ConfirmEmailUseCase,
  ) {}

  @Patch('confirm')
  async confirmEmail(@Query('token') token: string) {
    await this.confirmEmailUseCase.execute(token);

    return;
  }

  @Post('signin')
  async signin(@Body() { email, password }: SigninBody) {
    const { accessToken } = await this.signInUseCase.execute(email, password);

    return { access_token: accessToken };
  }

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
