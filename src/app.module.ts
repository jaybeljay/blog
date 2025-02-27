import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/app-config/validation.schema';
import configuration from './config/app-config/configuration';
import { LoggerModule } from 'nestjs-pino';
import { LoggerConfig } from './config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    LoggerModule.forRootAsync(LoggerConfig),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
