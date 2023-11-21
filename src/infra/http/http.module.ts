import { Module } from '@nestjs/common';
import { AuthModule } from '@infra/auth/auth.module';
import { S3Service } from '@infra/upload/s3.service';
import { AuthController } from './controllers/auth.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { SignUpUseCase } from '@application/use-cases/auth/sign-up';

@Module({
  controllers: [AuthController],
  providers: [S3Service, SignUpUseCase],
  imports: [AuthModule, DatabaseModule],
})
export class HttpModule {}
