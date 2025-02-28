import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';
import { PostRepository } from 'src/post/repositories/post.repository';
import { CreatePostDto } from './dto/create-post.request.dto';
import { PostResponseDto } from 'src/post/common/dto/post.response.dto';

@Injectable()
export class CreatePostService {
  constructor(private readonly postRepository: PostRepository) {}

  async handle(
    userId: string,
    params: CreatePostDto,
  ): Promise<PostResponseDto> {
    const post = this.postRepository.create({
      ...params,
      userId,
    });

    await this.postRepository.save(post);

    return plainToInstance(PostResponseDto, post, plainToInstanceConfig);
  }
}
