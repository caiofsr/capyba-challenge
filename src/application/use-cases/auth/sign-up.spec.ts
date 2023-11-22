/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TestBed } from '@automock/jest';
import { SignUpUseCase } from './sign-up';
import { ConfigService } from '@nestjs/config';
import { S3Service } from '@infra/upload/s3.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from '@application/repositories/user-repository';

describe('SignUp', () => {
  let signUpUseCase: SignUpUseCase;
  let s3Service: jest.Mocked<S3Service>;
  let configService: jest.Mocked<ConfigService>;
  let mailerService: jest.Mocked<MailerService>;
  let userRepository: jest.Mocked<UserRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(SignUpUseCase).compile();

    signUpUseCase = unit;
    s3Service = unitRef.get(S3Service);
    configService = unitRef.get(ConfigService);
    mailerService = unitRef.get(MailerService);
    // @ts-expect-error
    userRepository = unitRef.get(UserRepository);
  });

  it('should create a new user with upload to S3', async () => {
    const signUpRequest = {
      name: 'John Doe',
      password: 'password123',
      email: 'johndoe@example.com',
      file: {} as Express.Multer.File,
    };

    await signUpUseCase.execute(signUpRequest);

    expect(userRepository.create).toHaveBeenCalled();
    expect(s3Service.uploadFile).toHaveBeenCalled();
    expect(mailerService.sendMail).toHaveBeenCalled();
    expect(configService.getOrThrow).toHaveBeenCalled();
  });

  it('should create a new user without upload to S3', async () => {
    const signUpRequest = {
      name: 'John Doe',
      password: 'password123',
      email: 'johndoe@example.com',
      file: null,
    };

    await signUpUseCase.execute(signUpRequest);

    expect(userRepository.create).toHaveBeenCalled();
    expect(s3Service.uploadFile).not.toHaveBeenCalled();
    expect(mailerService.sendMail).toHaveBeenCalled();
    expect(configService.getOrThrow).toHaveBeenCalled();
  });
});
