import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/application/use-cases/user/create-user.use-case';
import { LoginUseCase } from 'src/application/use-cases/user/login.use-case';
import { CreateUserDTO } from '../dtos/user/create-user.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { UserDTO } from '../dtos/user/user.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { UserMapper } from '../mappers/user.mapper';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('sign-up')
  async signUp(@Body() data: CreateUserDTO): Promise<{ user: UserDTO }> {
    const { user } = await this.createUserUseCase.execute(data);

    return { user: UserMapper.toDto(user) };
  }

  @Post('login')
  async login(@Body() data: LoginDTO) {
    return await this.loginUseCase.execute(data);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async test() {
    return { test: true };
  }
}
