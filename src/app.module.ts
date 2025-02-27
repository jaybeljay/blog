import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/app-config/validation.schema';
import configuration from './config/app-config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
