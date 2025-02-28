import { UsersController } from 'src/user/common/constants';
import { ChangePasswordService } from './change-password.service';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Patch, UseGuards } from '@nestjs/common';
import { IAM } from 'src/common/decorators/iam.decorator';
import { ChangePasswordDto } from './dto/change-password.request.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@UsersController()
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Patch('change-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: `Change user's password` })
  @ApiResponse({ type: () => UserResponseDto })
  @UseGuards(JwtAuthGuard)
  async handle(
    @IAM('id') id: string,
    @Body() dto: ChangePasswordDto,
  ): Promise<UserResponseDto> {
    return this.changePasswordService.handle(id, dto);
  }
}
