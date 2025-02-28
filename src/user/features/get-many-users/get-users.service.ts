import { Injectable } from '@nestjs/common';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { GetUsersRequestDto } from './dto/get-users.request.dto';
import { UsersResponseDto } from './dto/users.response.dto';
import { paginate } from 'src/lib/utils/paginate';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';

@Injectable()
export class GetUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(query: GetUsersRequestDto): Promise<UsersResponseDto> {
    const { username } = query;

    const userQb = this.userRepository.createQueryBuilder('users');

    if (username) {
      userQb.andWhere(`users.username ILIKE :username`, {
        username: `%${username}%`,
      });
    }

    const result = await paginate<UserResponseDto>(userQb, query);

    return {
      ...result,
      data: result.data.map((user) =>
        plainToInstance(UserResponseDto, user, plainToInstanceConfig),
      ),
    };
  }
}
