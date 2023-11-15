import { Password } from './password';

describe('Password class', () => {
  it('should throw an error if password is less than 8 characters', async () => {
    const password = '1234567';
    await expect(Password.hashPassword(password)).rejects.toThrowError('A senha deve ter pelo menos 8 caracteres');
  });

  it('should hash password successfully', async () => {
    const password = 'password123';
    const hashedPassword = await Password.hashPassword(password);

    expect(hashedPassword.length).toBeGreaterThan(0);
    expect(hashedPassword.startsWith('$argon2id$v=19$m=65536,t=3,p=4')).toBeTruthy();
  });

  it('should create a Password instance with a hashed password', async () => {
    const password = 'password123';
    const hashedPassword = await Password.hashPassword(password);
    const newPassword = new Password(hashedPassword);
    expect(newPassword.value).toEqual(hashedPassword);
  });
});
