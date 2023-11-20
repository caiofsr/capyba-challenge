import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}
