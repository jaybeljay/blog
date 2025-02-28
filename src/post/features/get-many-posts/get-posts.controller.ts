import { GetPostsService } from './get-posts.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Get, Query, UseGuards } from '@nestjs/common';
import { PostsResponseDto } from './dto/posts.response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { GetPostsRequestDto } from './dto/get-posts.request.dto';
import { PostsController } from 'src/post/common/constants';

@PostsController()
export class GetPostsController {
  constructor(private readonly getPostsService: GetPostsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get many posts' })
  @ApiResponse({ type: () => PostsResponseDto })
  @UseGuards(JwtAuthGuard)
  async handle(@Query() query: GetPostsRequestDto): Promise<PostsResponseDto> {
    return this.getPostsService.handle(query);
  }
}
