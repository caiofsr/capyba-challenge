import { PrismaService } from '../prisma.service';
import { User } from '@application/entities/user/user';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { UserRepository } from '@application/repositories/user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    const userPrisma = await this.prismaService.user.create({ data });

    return PrismaUserMapper.toDomain(userPrisma);
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
