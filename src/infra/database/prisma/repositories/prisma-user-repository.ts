import { User } from '@application/entities/user/user';
import { UserRepository } from '@application/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  create(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return PrismaUserMapper.toDomain(user);
  }
}
