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

  async save(user: User) {
    const userIndex = this.users.findIndex((user) => user.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    } else {
      this.users.push(user);
    }

    return user;
  }
}
