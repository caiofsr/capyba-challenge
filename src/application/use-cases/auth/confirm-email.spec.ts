/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Cache } from 'cache-manager';
import { TestBed } from '@automock/jest';
import { BadRequestException } from '@nestjs/common';
import { ConfirmEmailUseCase } from './confirm-email';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { User } from '@application/entities/user/user';
import { makeUser } from '@test/factories/user-factory';
import { UserRepository } from '@application/repositories/user-repository';

describe('Confirm Email', () => {
  let user: User;
  let useCase: ConfirmEmailUseCase;
  let redisService: jest.Mocked<Cache>;
  let userRepository: jest.Mocked<UserRepository>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(ConfirmEmailUseCase).compile();

    useCase = unit;
    redisService = unitRef.get(CACHE_MANAGER);
    // @ts-expect-error
    userRepository = unitRef.get(UserRepository);

    user = await makeUser();
  });

  it('should update user if token is valid', async () => {
    redisService.get.mockResolvedValue(user.externalId);
    userRepository.findById.mockResolvedValue(user);

    await useCase.execute('token');

    expect(userRepository.save).toHaveBeenCalled();
    expect(redisService.get).toHaveBeenCalled();
    expect(redisService.del).toHaveBeenCalled();
    expect(userRepository.findById).toHaveBeenCalled();
    expect(user.confirmedEmail).toBeTruthy();
  });

  it('should throw if token is invalid', async () => {
    await expect(useCase.execute('invalid-token')).rejects.toThrow(new BadRequestException('Token does not exist.'));
    expect(redisService.get).toHaveBeenCalled();
    expect(userRepository.findById).not.toHaveBeenCalled();
  });
});
