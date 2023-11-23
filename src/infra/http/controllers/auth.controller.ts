import { SignInBody } from '../dtos/sign-in-body';
import { SignUpBody } from '../dtos/sign-up-body';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignUpUseCase } from '@application/use-cases/auth/sign-up';
import { SignInUseCase } from '@application/use-cases/auth/sign-in';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignOutUseCase } from '@application/use-cases/auth/sign-out';
import { ConfirmEmailUseCase } from '@application/use-cases/auth/confirm-email';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@ApiTags('Auth')
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
  @ApiResponse({ status: 200, description: 'JWT deleted successfully' })
  async deleteToken(@Body() body: { userId: string }) {
    await this.signOutUseCase.execute(body.userId);

    return;
  }

  @Patch('confirm')
  @ApiResponse({ status: 400, description: 'Token does not exist' })
  @ApiResponse({ status: 200, description: 'Email confirmed successfully' })
  async confirmEmail(@Query('token') token: string) {
    await this.confirmEmailUseCase.execute(token);

    return;
  }

  @HttpCode(200)
  @Post('signin')
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 200, description: 'JWT created successfully' })
  async signin(@Body() { email, password }: SignInBody) {
    const { accessToken } = await this.signInUseCase.execute(email, password);

    return { access_token: accessToken };
  }

  @Post('signup')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: 400, description: 'Email already in use' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async signup(
    @Body() { email, name, password }: SignUpBody,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    await this.signUpUseCase.execute({ email, name, password, file });

    return;
  }
}
