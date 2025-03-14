import { MongoAbility } from '@casl/ability';
import { IPolicyHandler } from '../types';
import { Action } from 'src/third-party/ability-factory/types';
import { Post } from 'src/post/entities/post.entity';

export class UpdatePostPolicyHandler implements IPolicyHandler {
  handle(ability: MongoAbility, subject: Post) {
    return ability.can(Action.Update, subject, 'userId');
  }
}
