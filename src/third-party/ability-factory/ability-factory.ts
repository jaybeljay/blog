import { Injectable } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { Action, Subjects } from './types';
import { PostRepository } from 'src/post/repositories/post.repository';

@Injectable()
export class AbilityFactory {
  //constructor(private readonly postRepository: PostRepository) {}

  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    /*const posts = await this.postRepository.find({
      where: { userId: user.id },
    });*/

    can(Action.Update, 'Post', { userId: user.id });
    can(Action.Delete, 'Post', { userId: user.id });

    return build();
  }
}
