import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { S3Service } from '@infra/upload/s3.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@application/entities/user/user';
import { Password } from '@application/entities/user/password';
import { UserRepository } from '@application/repositories/user-repository';

interface SignUpRequest {
  name: string;
  password: string;
  email: string;
  file: Express.Multer.File;
}

@Injectable()
export class SignUpUseCase {
  constructor(
    private s3Service: S3Service,
    private mailerService: MailerService,
    private configService: ConfigService,
    private userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private redisService: Cache,
  ) {}

  async execute({ name, password, email, file }: SignUpRequest): Promise<void> {
    let photoUrl: string;

    if (file) {
      photoUrl = await this.s3Service.uploadFile(file);
    } else {
      photoUrl = `https://ui-avatars.com/api/?name=${name}&size=512`;
    }

    const user = new User({
      name,
      password: await Password.hashPassword(password),
      email,
      photoUrl,
    });

    await this.userRepository.create(user);

    const token = Buffer.from(email).toString('base64');

    await this.redisService.set(`confirmation:${token}`, user.id);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm your email',
      text: `http://${this.configService.getOrThrow('HOST')}:${this.configService.getOrThrow(
        'PORT',
      )}/v1/auth/confirm?token=${token}`,
    });

    return;
  }
}
