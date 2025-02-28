import { CreatePostService } from './create-post.service';
import { Body, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostResponseDto } from 'src/post/common/dto/post.response.dto';
import { CreatePostDto } from './dto/create-post.request.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { PostsController } from 'src/post/common/constants';
import { IAM } from 'src/common/decorators/iam.decorator';

@PostsController()
export class CreatePostController {
  constructor(private readonly createPostService: CreatePostService) {}

  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ type: () => PostResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async handle(
    @IAM('id') id: string,
    @Body() dto: CreatePostDto,
  ): Promise<PostResponseDto> {
    return this.createPostService.handle(id, dto);
  }
}
