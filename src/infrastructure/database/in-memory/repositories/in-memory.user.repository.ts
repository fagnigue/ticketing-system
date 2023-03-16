import { UserRepository } from 'src/application/repositories/user.repository';
import { User } from 'src/domain/entities/user';
import * as random from 'random-string-generator';
import { Injectable } from '@nestjs/common';
import { GetUserParams } from 'src/utils/types/get-user-params.type';
export const usersCollection = [
  {
    id: '123',
    email: 'user1@example.com',
    lastname: 'user1',
    firstname: 'test',
    password: '$2a$08$596A3GRDXZXnLgZ0dt61oOBFxOAVdXDq6DgNyvXuHCwie36z74ZPu',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1234',
    email: 'user2@example.com',
    lastname: 'user2',
    firstname: 'test',
    password: '$2a$08$RsFOyAuwnEjmsilPVLt2.ebRkQxZk5rJVhHQW9P8e1cuKAmYC2aI6',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = usersCollection.map((user) => new User(user));

  async createUser(user: User): Promise<User> {
    user.id = user?.id || random();
    user.createdAt = new Date();
    this.users.push(user);
    const userSaved = this.users.find((u) => u.id === user.id) ?? null;

    return userSaved;
  }

  async getUser(params: GetUserParams): Promise<User | null> {
    const user =
      this.users.find(
        (u) => u.id === params.userId || u.email === params.email,
      ) ?? null;
    return user;
  }
}
