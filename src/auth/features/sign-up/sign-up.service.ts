import { ConflictException, Injectable } from '@nestjs/common';
import { BcryptService } from 'src/third-party/bcrypt';
import { JwtService } from 'src/third-party/jwt';
import { UserRepository } from 'src/user/repositories/user.repository';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { TokenResponseDto } from 'src/auth/common/dto/token.response.dto';

@Injectable()
export class SignUpService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly userRepository: UserRepository,
  ) {}

  async handle(params: SignUpRequestDto): Promise<TokenResponseDto> {
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

    const token = await this.jwtService.createJwtToken({
      sub: user.id,
    });

    return {
      token,
    };
  }
}
