import { UsersController } from 'src/user/common/constants';
import { CreateUserService } from './create-user.service';
import { CreateUserDto } from './dto/create-user.request.dto';
import { Body, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';

@UsersController()
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ type: () => UserResponseDto })
  async handle(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserService.handle(dto);
  }
}
