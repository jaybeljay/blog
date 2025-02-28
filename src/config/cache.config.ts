import { createKeyv, Keyv } from '@keyv/redis';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheableMemory } from 'cacheable';

export const cacheConfig: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const host = configService.get('redis.host');
    const port = configService.get('redis.port');
    const uri = `redis://${host}:${port}`;

    return {
      stores: [
        new Keyv({
          store: new CacheableMemory({ ttl: 60 * 10, lruSize: 5000 }),
        }),
        createKeyv(uri),
      ],
    };
  },
  inject: [ConfigService],
};
