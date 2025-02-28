import { Injectable } from '@nestjs/common';
import { PostRepository } from 'src/post/repositories/post.repository';

@Injectable()
export class DeletePostService {
  constructor(private readonly postRepository: PostRepository) {}

  async handle(id: string): Promise<void> {
    await this.postRepository.findOneOrFail({ where: { id } });

    await this.postRepository.delete(id);

    return;
  }
}
