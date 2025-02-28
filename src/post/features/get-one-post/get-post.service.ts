import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';
import { PostResponseDto } from 'src/post/common/dto/post.response.dto';
import { PostRepository } from 'src/post/repositories/post.repository';

@Injectable()
export class GetPostService {
  constructor(private readonly postRepository: PostRepository) {}

  async handle(id: string): Promise<PostResponseDto> {
    const post = await this.postRepository.findOneOrFail({ where: { id } });

    return plainToInstance(PostResponseDto, post, plainToInstanceConfig);
  }
}
