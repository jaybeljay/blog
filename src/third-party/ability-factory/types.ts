import { Ability, InferSubjects } from '@casl/ability';
import { Post } from '../../post/entities/post.entity';

export enum Action {
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof Post>;

export type AppAbility = Ability<[Action, Subjects]>;
