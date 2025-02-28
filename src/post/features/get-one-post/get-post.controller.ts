import { GetPostService } from './get-post.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import {
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { PostsController } from 'src/post/common/constants';
import { PostResponseDto } from 'src/post/common/dto/post.response.dto';
import { HttpCacheInterceptor } from 'src/common/interceptors/cache.interceptor';

@PostsController()
export class GetPostController {
  constructor(private readonly getPostService: GetPostService) {}

  @Get(':id')
  @UseInterceptors(HttpCacheInterceptor)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOperation({ summary: 'Get one post' })
  @ApiResponse({ type: () => PostResponseDto })
  @UseGuards(JwtAuthGuard)
  async handle(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<PostResponseDto> {
    return this.getPostService.handle(id);
  }
}
