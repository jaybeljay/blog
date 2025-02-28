import { UsersController } from 'src/user/common/constants';
import { DeleteUserService } from './delete-user.service';
import { Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { IAM } from 'src/common/decorators/iam.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@UsersController()
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete()
  @ApiOperation({ summary: 'Delete user' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async handle(@IAM('id') id: string): Promise<void> {
    return this.deleteUserService.handle(id);
  }
}
