import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return false;
    }

    const isMatch = await argon.verify(user.password, password);

    if (!isMatch) {
      return false;
    }

    return true;
  }
}
