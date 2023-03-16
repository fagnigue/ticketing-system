import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { UserRepository } from 'src/application/repositories/user.repository';
import { User } from 'src/domain/entities/user';
import { GetUserParams } from 'src/utils/types/get-user-params.type';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public toDomain(user: PrismaUser): User {
    return new User(user);
  }

  async createUser(user: User): Promise<User> {
    const data = this.toPrisma(user);
    const createdUser = await this.prisma.user.create({ data });
    return this.toDomain(createdUser);
  }

  async getUser(params: GetUserParams): Promise<User> {
    const { userId: id, email } = params;
    const userData = await this.prisma.user.findFirst({
      where: {
        OR: [{ id }, { email }],
      },
    });

    return this.toDomain(userData);
  }
}
