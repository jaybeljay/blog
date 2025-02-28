import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';
import { PostRepository } from 'src/post/repositories/post.repository';
import { PostResponseDto } from 'src/post/common/dto/post.response.dto';
import { UpdatePostDto } from './dto/update-post.request.dto';

@Injectable()
export class UpdatePostService {
  constructor(private readonly postRepository: PostRepository) {}

  async handle(id: string, params: UpdatePostDto): Promise<PostResponseDto> {
    const post = await this.postRepository.findOneOrFail({ where: { id } });

    post.title = params.title ?? post.title;
    post.description = params.description ?? post.description;

    await this.postRepository.save(post);

    return plainToInstance(PostResponseDto, post, plainToInstanceConfig);
  }
}
