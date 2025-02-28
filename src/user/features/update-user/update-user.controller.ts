import { UsersController } from 'src/user/common/constants';
import { UpdateUserService } from './update-user.service';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Patch, UseGuards } from '@nestjs/common';
import { IAM } from 'src/common/decorators/iam.decorator';
import { UpdateUserDto } from './dto/update-user.request.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@UsersController()
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ type: () => UserResponseDto })
  @UseGuards(JwtAuthGuard)
  async handle(
    @IAM('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.updateUserService.handle(id, dto);
  }
}
