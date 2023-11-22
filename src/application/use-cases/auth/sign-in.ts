import { AuthService } from '@infra/auth/auth.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class SignInUseCase {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private redisService: Cache,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Email and Password does not match.');
    }

    const { accessToken } = await this.authService.login(user);

    await this.redisService.set(`jwt:${user.externalId}`, accessToken, 0);

    return {
      accessToken,
    };
  }
}
