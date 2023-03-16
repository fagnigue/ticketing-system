import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/application/repositories/user.repository';
import { User } from 'src/domain/entities/user';
import {
  NotFound,
  WrongPassword,
} from 'src/utils/constants/exception-messages';
import { UseCase } from '../use-case';

export interface LoginUseCaseRequest {
  email: string;
  password: string;
}

export interface LoginUseCaseResponse {
  accessToken: string;
}

@Injectable()
export class LoginUseCase
  implements UseCase<LoginUseCaseRequest, LoginUseCaseResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(data: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const { email, password } = data;
    const userData = await this.userRepository.getUser({ email });

    if (!userData.id) {
      throw new HttpException(NotFound(User.name), HttpStatus.NOT_FOUND);
    }

    if (!userData.comparePassword(password)) {
      throw new HttpException(WrongPassword, HttpStatus.BAD_REQUEST);
    }

    const payload = { id: userData.id, email: userData.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
