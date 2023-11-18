import { AuthService } from '@infra/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

export class SignIn {
  constructor(private authService: AuthService) {}

  async execute(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { access_token } = await this.authService.login(user);

    return {
      type: 'Bearer',
      access_token,
    };
  }
}
