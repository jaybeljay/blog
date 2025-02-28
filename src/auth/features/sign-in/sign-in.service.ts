import { ConflictException, Injectable } from '@nestjs/common';
import { BcryptService } from 'src/third-party/bcrypt';
import { JwtService } from 'src/third-party/jwt';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { TokenResponseDto } from 'src/auth/common/dto/token.response.dto';

import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class SignInService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly userRepository: UserRepository,
  ) {}

  async handle(body: SignInRequestDto): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOne({
      where: { username: body.username },
    });

    if (!user) {
      throw new ConflictException(`Invalid username or password`);
    }

    const isPasswordMatch = await this.bcryptService.compare(
      body.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new ConflictException('Invalid username or password');
    }

    const token = await this.jwtService.createJwtToken({
      sub: user.id,
    });

    return {
      token,
    };
  }
}
