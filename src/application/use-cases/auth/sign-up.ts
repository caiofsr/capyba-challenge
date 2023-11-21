import { Injectable } from '@nestjs/common';
import { User } from '@application/entities/user/user';
import { S3Service } from '@infra/upload/s3.service';
import { UserRepository } from '@application/repositories/user-repository';

interface SignUpRequest {
  name: string;
  password: string;
  email: string;
  file: Express.Multer.File;
}

interface SignUpResponse {
  user: User;
}

@Injectable()
export class SignUpUseCase {
  constructor(
    private userRepository: UserRepository,
    private s3Service: S3Service,
  ) {}

  async execute({ name, password, email, file }: SignUpRequest): Promise<SignUpResponse> {
    let photoUrl: string;

    if (file) {
      console.log('chamou');
      photoUrl = await this.s3Service.uploadFile(file);
    } else {
      photoUrl = `https://ui-avatars.com/api/?name=${name}&size=512`;
    }

    const user = new User({
      name,
      password,
      email,
      photoUrl,
    });

    await this.userRepository.create(user);

    return;
  }
}
