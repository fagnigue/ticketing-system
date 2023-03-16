import { JwtService } from '@nestjs/jwt';
import { InMemoryUserRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.user.repository';
import { LoginUseCase } from './login.use-case';

describe('Login User', () => {
  it('should return access token', async () => {
    const userRepository = new InMemoryUserRepository();
    const jwtService = new JwtService({
      secret: 'hfh',
    });
    const loginUseCase = new LoginUseCase(userRepository, jwtService);

    const loginData = {
      email: 'user1@example.com',
      password: 'user1',
    };
    const response = await loginUseCase.execute(loginData);

    expect(response.accessToken).toBeDefined();
  });
});
