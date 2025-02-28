import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { UpdateUserDto } from './dto/update-user.request.dto';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(id: string, params: UpdateUserDto): Promise<UserResponseDto> {
    const { username } = params;

    const user = await this.userRepository.findOneOrFail({ where: { id } });

    if (!username) {
      return plainToInstance(UserResponseDto, user, plainToInstanceConfig);
    }

    if (username && user.username !== username) {
      await this.checkUsername(username);
      user.username = username;
    }

    await this.userRepository.save(user);

    return plainToInstance(UserResponseDto, user, plainToInstanceConfig);
  }

  async checkUsername(username: string): Promise<void> {
    const userExists = await this.userRepository.findOne({
      where: { username },
    });

    if (userExists) {
      throw new ConflictException(
        `User with username '${username}' already exists`,
      );
    }
  }
}
