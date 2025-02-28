import {
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { PostsController } from 'src/post/common/constants';
import { DeletePostService } from './delete-post.service';
import { CheckPolicies } from 'src/third-party/ability-factory/policies/constants';
import { PoliciesGuard } from 'src/third-party/ability-factory/policies/policies.guard';
import { DeletePostPolicyHandler } from 'src/third-party/ability-factory/policies/handlers/delete-post.policy-handler';

@PostsController()
export class DeletePostController {
  constructor(private readonly deletePostService: DeletePostService) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiNoContentResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(new DeletePostPolicyHandler())
  async handle(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.deletePostService.handle(id);
  }
}
