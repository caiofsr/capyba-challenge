import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from '@infra/auth/auth.module';
import { HttpModule } from '@infra/http/http.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as redisStore from 'cache-manager-redis-store';
import { UploadModule } from '@infra/upload/upload.module';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        secure: false,
        port: Number(process.env.SMTP_PORT),
        ignoreTLS: true,
      },
      defaults: {
        from: process.env.SMTP_FROM,
      },
    }),
    DatabaseModule,
    AuthModule,
    UploadModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
