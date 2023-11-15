import { User } from './user';

describe('User class', () => {
  it('should create a user with default values for optional properties', () => {
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      photoUrl: 'https://example.com/avatar.png',
    });

    expect(user.externalId).toBeTruthy();
    expect(user.createdAt instanceof Date).toBeTruthy();
    expect(user.updatedAt instanceof Date).toBeTruthy();
  });

  it('should allow setting optional properties', () => {
    const user = new User({
      externalId: '12345678-90ab-cdef-1234-567890abcdef',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      photoUrl: 'https://example.com/avatar.png',
      createdAt: new Date(2023, 10, 14),
      updatedAt: new Date(2023, 10, 14),
    });

    expect(user.externalId).toBe('12345678-90ab-cdef-1234-567890abcdef');
    expect(user.createdAt).toEqual(new Date(2023, 10, 14));
    expect(user.updatedAt).toEqual(new Date(2023, 10, 14));
  });

  it('should provide getter and setter methods for all properties', () => {
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      photoUrl: 'https://example.com/avatar.png',
    });

    expect(user.id).toBeUndefined();
    expect(user.externalId).toBeTruthy();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@example.com');
    expect(user.password).toBe('password123');
    expect(user.photoUrl).toBe('https://example.com/avatar.png');
    expect(user.createdAt instanceof Date).toBeTruthy();
    expect(user.updatedAt instanceof Date).toBeTruthy();
    expect(user.confirmedEmail).toBeFalsy();

    user.name = 'Jane Doe';
    user.email = 'janedoe@example.com';
    user.password = 'password456';
    user.photoUrl = 'https://example.com/avatar2.png';
    user.confirmEmail();
    user.update();

    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('janedoe@example.com');
    expect(user.password).toBe('password456');
    expect(user.photoUrl).toBe('https://example.com/avatar2.png');
    expect(user.confirmedEmail).toBeTruthy();
    expect(user.createdAt instanceof Date).toBeTruthy();
    expect(user.updatedAt instanceof Date).toBeTruthy();
  });
});
