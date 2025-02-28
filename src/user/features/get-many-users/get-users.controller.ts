import { UsersController } from 'src/user/common/constants';
import { GetUsersService } from './get-users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Get, Query, UseGuards } from '@nestjs/common';
import { GetUsersRequestDto } from './dto/get-users.request.dto';
import { UsersResponseDto } from './dto/users.response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@UsersController()
export class GetUsersController {
  constructor(private readonly getUsersService: GetUsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many users' })
  @ApiResponse({ type: () => UsersResponseDto })
  @UseGuards(JwtAuthGuard)
  async handle(@Query() query: GetUsersRequestDto): Promise<UsersResponseDto> {
    return this.getUsersService.handle(query);
  }
}
