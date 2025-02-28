import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  protected cacheMethods = ['POST', 'GET'];

  trackBy(context: ExecutionContext): string | undefined {
    const req = context.switchToHttp().getRequest();

    if (!this.cacheMethods.includes(req.method)) {
      return;
    }

    const key = super.trackBy(context);

    return key ? key : undefined;
  }
}
