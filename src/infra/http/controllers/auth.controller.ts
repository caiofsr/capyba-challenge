import { SigninBody } from '../dtos/sign-in-body';
import { SignUpBody } from '../dtos/sign-up-body';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignUpUseCase } from '@application/use-cases/auth/sign-up';
import { SignInUseCase } from '@application/use-cases/auth/sign-in';
import { SignOutUseCase } from '@application/use-cases/auth/sign-out';
import { ConfirmEmailUseCase } from '@application/use-cases/auth/confirm-email';
import { Body, Controller, Delete, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private signUpUseCase: SignUpUseCase,
    private signInUseCase: SignInUseCase,
    private signOutUseCase: SignOutUseCase,
    private confirmEmailUseCase: ConfirmEmailUseCase,
  ) {}

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteToken(@Body() body: { userId: string }) {
    await this.signOutUseCase.execute(body.userId);

    return;
  }

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
