import * as argon from 'argon2';

export class Password {
  get value(): string {
    return this.password;
  }

  static async hashPassword(password: string) {
    const isContentLengthValid = password.length < 8 ? false : true;

    if (!isContentLengthValid) {
      throw new Error('A senha deve ter pelo menos 8 caracteres');
    }

    const hashedPassword = await argon.hash(password);

    return hashedPassword;
  }

  constructor(private readonly password: string) {}
}
