import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@application/entities/user/user';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { UserRepository } from '@application/repositories/user-repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: number): Promise<User> {
    const userPrisma = await this.prismaService.user.findUnique({ where: { id } });

    if (!userPrisma) {
      return null;
    }

    return PrismaUserMapper.toDomain(userPrisma);
  }

  async save(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    const userPrisma = await this.prismaService.user.update({
      where: { id: data.id },
      data,
    });

    return PrismaUserMapper.toDomain(userPrisma);
  }

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    const userPrisma = await this.prismaService.user.create({ data });

    return PrismaUserMapper.toDomain(userPrisma);
  }

  async findByEmail(email: string): Promise<User> {
    const userPrisma = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!userPrisma) {
      return null;
    }

    return PrismaUserMapper.toDomain(userPrisma);
  }
}
