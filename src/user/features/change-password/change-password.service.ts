import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ChangePasswordDto } from './dto/change-password.request.dto';
import { BcryptService } from 'src/third-party/bcrypt';

@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async handle(
    id: string,
    params: ChangePasswordDto,
  ): Promise<UserResponseDto> {
    const { password } = params;

    const user = await this.userRepository.findOneOrFail({ where: { id } });

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (isPasswordMatch) {
      return plainToInstance(UserResponseDto, user, plainToInstanceConfig);
    }

    const hashedPassword = await this.bcryptService.hash(password);
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return plainToInstance(UserResponseDto, user, plainToInstanceConfig);
  }
}
