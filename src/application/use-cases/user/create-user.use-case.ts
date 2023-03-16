import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/repositories/user.repository';
import { User } from 'src/domain/entities/user';
import { AlreadyExist } from 'src/utils/constants/exception-messages';
import { UseCase } from '../use-case';

interface CreateUserUseCaseRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase
  implements UseCase<CreateUserUseCaseRequest, CreateUserUseCaseResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    data: CreateUserUseCaseRequest,
  ): Promise<CreateUserUseCaseResponse> {
    let user = await this.userRepository.getUser({ email: data.email });

    if (user) {
      throw new HttpException(AlreadyExist(User.name), HttpStatus.BAD_REQUEST);
    }
    user = new User(data);
    user.hashPassword();

    const createdUser = await this.userRepository.createUser(user);
    return { user: createdUser };
  }
}
