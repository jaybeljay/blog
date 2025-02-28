import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { plainToInstanceConfig } from 'src/config/plain-to-instance.config';
import { PostRepository } from 'src/post/repositories/post.repository';
import { PostResponseDto } from 'src/post/common/dto/post.response.dto';
import { UpdatePostDto } from './dto/update-post.request.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UpdatePostService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async handle(id: string, params: UpdatePostDto): Promise<PostResponseDto> {
    const post = await this.postRepository.findOneOrFail({ where: { id } });

    post.title = params.title ?? post.title;
    post.description = params.description ?? post.description;

    await this.postRepository.save(post);

    await this.cacheManager.clear();

    return plainToInstance(PostResponseDto, post, plainToInstanceConfig);
  }
}
