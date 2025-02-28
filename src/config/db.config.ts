import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { NODE_ENV } from 'src/common/types';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dbConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('postgres.host'),
    port: configService.get<number>('postgres.port'),
    username: configService.get<string>('postgres.user'),
    password: configService.get<string>('postgres.password'),
    database: configService.get<string>('postgres.dbName'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging:
      process.env.NODE_ENV === NODE_ENV.DEV ||
      process.env.NODE_ENV === NODE_ENV.STAGE,
    namingStrategy: new SnakeNamingStrategy(),
  }),
  inject: [ConfigService],
};
