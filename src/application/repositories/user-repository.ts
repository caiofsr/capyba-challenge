import { User } from '@application/entities/user/user';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract save(user: User): Promise<User>;
}
