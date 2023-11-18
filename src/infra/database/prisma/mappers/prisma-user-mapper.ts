import { User } from '@application/entities/user/user';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(user: PrismaUser) {
    return new User(
      {
        externalId: user.externalId,
        name: user.name,
        email: user.email,
        password: user.password,
        photoUrl: user.photoUrl,
        confirmedEmail: user.confirmedEmail,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
  }
}
