import { User } from 'src/domain/entities/user';
import { UserDTO } from '../dtos/user/user.dto';

export class UserMapper {
  private constructor() {
    throw new Error(
      'UserMapper is a static class and should not be instantiated',
    );
  }

  public static toDto(user: User): UserDTO {
    return {
      id: user?.id,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
      email: user?.email,
      firstname: user?.firstname,
      lastname: user?.lastname,
    };
  }
}
