import { UsersController } from 'src/user/common/constants';
import { GetUserService } from './get-user.service';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@UsersController()
export class GetUserController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({ type: () => UserResponseDto })
  @UseGuards(JwtAuthGuard)
  async handle(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserResponseDto> {
    return this.getUserService.handle(id);
  }
}
