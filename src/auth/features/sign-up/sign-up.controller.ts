import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { SignUpService } from './sign-up.service';
import { AuthController } from 'src/auth/common/constants';
import { TokenResponseDto } from 'src/auth/common/dto/token.response.dto';

@AuthController()
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign up' })
  async handle(@Body() body: SignUpRequestDto): Promise<TokenResponseDto> {
    return this.signUpService.handle(body);
  }
}
