import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/app-config/validation.schema';
import configuration from './config/app-config/configuration';
import { LoggerModule } from 'nestjs-pino';
import { LoggerConfig } from './config/logger.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    LoggerModule.forRootAsync(LoggerConfig),
    TypeOrmModule.forRootAsync(dbConfig),
    UserModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
