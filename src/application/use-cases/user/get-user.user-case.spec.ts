import { User } from 'src/domain/entities/user';
import { InMemoryUserRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.user.repository';
import { GetUserUseCase } from './get-user.use-case';

describe('GetUserUseCase', () => {
  it('should return an instance of user', async () => {
    const userRepository = new InMemoryUserRepository();
    const getUserUseCase = new GetUserUseCase(userRepository);

    const userId = '123';
    const response = await getUserUseCase.execute({ userId });

    expect(response.user).toBeInstanceOf(User);
    expect(response.user.id).toBe(userId);
  });
});
