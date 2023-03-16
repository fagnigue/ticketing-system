import { User } from 'src/domain/entities/user';
import { InMemoryUserRepository } from 'src/infrastructure/database/in-memory/repositories/in-memory.user.repository';
import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  it('should create user', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const request = {
      email: 'tebap20463@etondy.com',
      password: 'Tebap20463#',
      firstname: 'Teba',
      lastname: 'Parré',
    };

    const response = await createUserUseCase.execute(request);

    expect(response.user).toBeInstanceOf(User);
    expect(response.user.id).toBeDefined();
    expect(response.user.createdAt).toBeInstanceOf(Date);
  });
});
