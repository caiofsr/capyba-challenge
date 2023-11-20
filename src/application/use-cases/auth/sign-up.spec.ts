/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TestBed } from '@automock/jest';
import { SignUpUseCase } from './sign-up';
import { S3Service } from '@infra/upload/s3.service';
import { UserRepository } from '@application/repositories/user-repository';

describe('SignUp', () => {
  let signUpUseCase: SignUpUseCase;
  let userRepository: jest.Mocked<UserRepository>;
  let s3Service: jest.Mocked<S3Service>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(SignUpUseCase).compile();

    signUpUseCase = unit;
    // @ts-expect-error
    userRepository = unitRef.get(UserRepository);
    s3Service = unitRef.get(S3Service);
  });

  it('should create a new user', async () => {
    const signUpRequest = {
      name: 'John Doe',
      password: 'password123',
      email: 'johndoe@example.com',
      file: null,
    };

    await signUpUseCase.execute(signUpRequest);

    expect(userRepository.create).toHaveBeenCalled();
    expect(s3Service.uploadFile).toHaveBeenCalled();
  });
});
