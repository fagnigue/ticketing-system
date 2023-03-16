import { User } from 'src/domain/entities/user';
import { GetUserParams } from 'src/utils/types/get-user-params.type';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>;
  abstract getUser(params: GetUserParams): Promise<User | null>;
}
