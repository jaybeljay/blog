import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { SignInService } from './sign-in.service';
import { AuthController } from 'src/auth/common/constants';
import { TokenResponseDto } from 'src/auth/common/dto/token.response.dto';

@AuthController()
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in' })
  async handle(@Body() body: SignInRequestDto): Promise<TokenResponseDto> {
    return this.signInService.handle(body);
  }
}
