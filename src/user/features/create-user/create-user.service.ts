import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';
import { BcryptService } from 'src/third-party/bcrypt';
import { CreateUserDto } from 'src/user/features/create-user/dto/create-user.request.dto';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async handle(params: CreateUserDto): Promise<UserResponseDto> {
    const { username, password } = params;

    const userExists = await this.userRepository.findOne({
      where: { username },
    });

    if (userExists) {
      throw new ConflictException(
        `User with username '${username}' already exists`,
      );
    }

    const hashedPassword = await this.bcryptService.hash(password);

    const user = this.userRepository.create({
      ...params,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return plainToInstance(UserResponseDto, user, plainToInstanceConfig);
  }
}
