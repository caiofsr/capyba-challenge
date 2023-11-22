import { Cache } from 'cache-manager';
import { TestBed } from '@automock/jest';
import { SignInUseCase } from './sign-in';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { User } from '@application/entities/user/user';
import { AuthService } from '@infra/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { makeUser } from '@test/factories/user-factory';

describe('SignIn', () => {
  let user: User;
  let signInUseCase: SignInUseCase;
  let redisService: jest.Mocked<Cache>;
  let authService: jest.Mocked<AuthService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(SignInUseCase).compile();
    signInUseCase = unit;
    authService = unitRef.get(AuthService);
    redisService = unitRef.get(CACHE_MANAGER);

    user = await makeUser({ password: 'super secret password' });
  });

  it('should be able to create a new access token', async () => {
    authService.validateUser.mockResolvedValue(user);
    authService.login.mockResolvedValue({ accessToken: 'access token' });

    await signInUseCase.execute(user.email, 'super secret password');

    expect(authService.validateUser).toHaveBeenCalled();
    expect(redisService.set).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should throw if the password is wrong', () => {
    expect(() => {
      return signInUseCase.execute(user.email, 'this is a wrong password');
    }).rejects.toThrow(new UnauthorizedException('Email and Password does not match.'));
  });
});
