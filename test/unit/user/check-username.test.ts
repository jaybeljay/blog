import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from 'src/user/entities/user.entity';
import { UpdateUserService } from 'src/user/features/update-user/update-user.service';

describe(UpdateUserService.name, () => {
  describe('check-username', () => {
    const repositoryMock = {
      findOne: jest.fn(),
    };

    // @ts-expect-error mock
    const service = new UpdateUserService(repositoryMock);

    const username = 'ivanivanov';
    const user = {
      id: '54748057405',
      username: username,
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;

    it('should find user with same username and throw error', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockReturnValue(user);

      await expect(service.checkUsername(username)).rejects.toThrow(
        new ConflictException(
          `User with username '${username}' already exists`,
        ),
      );
    });

    it('should return nothing because username is available', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockReturnValue(undefined);

      const result = await service.checkUsername(username);

      expect(result).toBe(void 0);
    });
  });
});
