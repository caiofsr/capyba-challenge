import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '@infra/auth/auth.module';
import { S3Service } from '@infra/upload/s3.service';
import { AuthController } from './controllers/auth.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { SignUpUseCase } from '@application/use-cases/auth/sign-up';
import { SignInUseCase } from '@application/use-cases/auth/sign-in';
import { GetUserId } from '@infra/middleware/get-user-id.middleware';
import { SignOutUseCase } from '@application/use-cases/auth/sign-out';
import { ConfirmEmailUseCase } from '@application/use-cases/auth/confirm-email';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  imports: [AuthModule, DatabaseModule],
  providers: [S3Service, SignUpUseCase, SignInUseCase, ConfirmEmailUseCase, SignOutUseCase, JwtService],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserId).forRoutes({ path: 'v1/auth', method: RequestMethod.DELETE });
  }
}
