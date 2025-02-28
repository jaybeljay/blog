import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });

    return plainToInstance(UserResponseDto, user, plainToInstanceConfig);
  }
}
