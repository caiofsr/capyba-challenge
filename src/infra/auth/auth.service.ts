import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return;
    }

    const isMatch = await argon.verify(user.password, password);

    if (!isMatch) {
      return;
    }

    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.externalId,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
