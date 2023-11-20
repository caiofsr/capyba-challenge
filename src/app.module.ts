import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@infra/auth/auth.module';
import { UploadModule } from '@infra/upload/upload.module';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, AuthModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
