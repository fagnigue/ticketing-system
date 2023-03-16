import { UserRepository } from 'src/application/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user';
import { UseCase } from '../use-case';

export interface GetUserUseCaseRequest {
  userId: string;
}

export interface GetUserUseCaseResponse {
  user: User;
}

@Injectable()
export class GetUserUseCase
  implements UseCase<GetUserUseCaseRequest, GetUserUseCaseResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const { userId } = data;
    const userData = await this.userRepository.getUser({ userId });

    return { user: userData };
  }
}
