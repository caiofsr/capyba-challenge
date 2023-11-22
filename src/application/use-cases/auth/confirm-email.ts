import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@application/repositories/user-repository';

@Injectable()
export class ConfirmEmailUseCase {
  constructor(
    private userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private redisService: Cache,
  ) {}

  async execute(token: string) {
    const userId = await this.redisService.get<string>(`confirmation:${token}`);

    if (!userId) {
      throw new BadRequestException('Token does not exist.');
    }

    const user = await this.userRepository.findById(userId);

    user.confirmEmail();

    await this.userRepository.save(user);

    return;
  }
}
