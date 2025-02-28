import { Injectable } from '@nestjs/common';
import { GetPostsRequestDto } from './dto/get-posts.request.dto';
import { PostsResponseDto } from './dto/posts.response.dto';
import { paginate } from 'src/lib/utils/paginate';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';
import { PostRepository } from 'src/post/repositories/post.repository';
import { PostResponseDto } from 'src/post/common/dto/post.response.dto';

@Injectable()
export class GetPostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async handle(query: GetPostsRequestDto): Promise<PostsResponseDto> {
    const { userId, search } = query;

    const postQb = this.postRepository.createQueryBuilder('posts');

    if (userId) {
      postQb.andWhere(`posts.user_id = :userId`, {
        userId,
      });
    }

    if (search) {
      postQb
        .andWhere(`posts.title ILIKE :title`, {
          title: `%${search}%`,
        })
        .orWhere(`posts.description ILIKE :description`, {
          description: `%${search}%`,
        });
    }

    const result = await paginate<PostResponseDto>(postQb, query);

    return {
      ...result,
      data: result.data.map((post) =>
        plainToInstance(PostResponseDto, post, plainToInstanceConfig),
      ),
    };
  }
}
