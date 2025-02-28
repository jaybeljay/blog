import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PostRepository } from 'src/post/repositories/post.repository';

@Injectable()
export class DeletePostService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async handle(id: string): Promise<void> {
    await this.postRepository.findOneOrFail({ where: { id } });

    await this.postRepository.delete(id);

    await this.cacheManager.clear();

    return;
  }
}
