import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from 'src/third-party/ability-factory/ability-factory';
import { PolicyHandler } from './types';
import { CHECK_POLICIES_KEY } from './constants';
import { MongoAbility } from '@casl/ability';
import { Subjects } from 'src/third-party/ability-factory/types';
import { PostRepository } from 'src/post/repositories/post.repository';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
    private readonly postRepository: PostRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const req = context.switchToHttp().getRequest();
    const { user } = req;
    const postId = req.params.id;

    const ability = this.caslAbilityFactory.createForUser(user);

    const subject = await this.postRepository.findOneOrFail({
      where: { id: postId },
    });

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, subject),
    );
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    ability: MongoAbility,
    subject: Subjects,
  ) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability, subject);
  }
}
