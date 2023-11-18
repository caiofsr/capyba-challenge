import { fakerPT_BR as faker } from '@faker-js/faker';
import { Password } from '@application/entities/user/password';
import { User, UserProps } from '@application/entities/user/user';

type Override = Partial<UserProps>;

export async function makeUser(override: Override = {}, id?: number) {
  return new User(
    {
      name: override.name ?? faker.person.fullName(),
      email: override.email ?? faker.internet.email(),
      password: await Password.hashPassword(override.password ?? faker.internet.password()),
      photoUrl: override.photoUrl ?? faker.internet.avatar(),
      externalId: override.externalId,
      confirmedEmail: override.confirmedEmail,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    id ?? faker.number.int(20),
  );
}
