import { Cache } from 'cache-manager';
import { SignOutUseCase } from './sign-out';
import { TestBed } from '@automock/jest';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('SignOut', () => {
  let signOutUseCase: SignOutUseCase;
  let redisService: jest.Mocked<Cache>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(SignOutUseCase).compile();

    signOutUseCase = unit;
    redisService = unitRef.get(CACHE_MANAGER);
  });

  it('should delete the token when signout', () => {
    signOutUseCase.execute('token');

    expect(redisService.del).toHaveBeenCalled();
  });
});
