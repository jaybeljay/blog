import { UpdatePostService } from './update-post.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  Body,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.request.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { PostsController } from 'src/post/common/constants';
import { PostResponseDto } from 'src/post/common/dto/post.response.dto';
import { UpdatePostPolicyHandler } from 'src/third-party/ability-factory/policies/handlers/update-post.policy-handler';
import { CheckPolicies } from 'src/third-party/ability-factory/policies/constants';
import { PoliciesGuard } from 'src/third-party/ability-factory/policies/policies.guard';
import { HttpCacheInterceptor } from 'src/common/interceptors/cache.interceptor';

@PostsController()
export class UpdatePostController {
  constructor(private readonly updatePostService: UpdatePostService) {}

  @Patch(':id')
  @UseInterceptors(HttpCacheInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({ type: () => PostResponseDto })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(new UpdatePostPolicyHandler())
  async handle(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdatePostDto,
  ): Promise<PostResponseDto> {
    return this.updatePostService.handle(id, dto);
  }
}
