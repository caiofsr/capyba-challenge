import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class SignOutUseCase {
  constructor(@Inject(CACHE_MANAGER) private redisService: Cache) {}

  async execute(userId: string) {
    await this.redisService.del(`jwt:${userId}`);
  }
}
