import { JwtService } from '@nestjs/jwt';
import { SignInUseCase } from './sign-in';
import { AuthService } from '@infra/auth/auth.service';
import { User } from '@application/entities/user/user';
import { UnauthorizedException } from '@nestjs/common';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';

jest.mock('@nestjs/jwt');

describe('SignIn', () => {
  let userRepository: InMemoryUserRepository;
  let jwtService: JwtService;
  let authService: AuthService;
  let signIn: SignInUseCase;
  let user: User;

  beforeAll(async () => {
    userRepository = new InMemoryUserRepository();
    jwtService = new JwtService();
    authService = new AuthService(userRepository, jwtService);
    signIn = new SignInUseCase(authService);
    user = await makeUser({ password: 'super secret password' });
  });

  it('should be able to create a new access token', async () => {
    userRepository.save(user);

    const { type } = await signIn.execute(user.email, 'super secret password');

    expect(jwtService.sign).toHaveBeenCalled();
    expect(type).toEqual('Bearer');
  });

  it('should throw if the password is wrong', () => {
    expect(() => {
      return signIn.execute(user.email, 'this is a wrong password');
    }).rejects.toThrow(new UnauthorizedException());
  });
});
