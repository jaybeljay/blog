import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NODE_ENV } from './common/types';

const useSwagger = (app: NestExpressApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Blog API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const appConfig = config.get('app');
  const port = appConfig.PORT;
  const env = appConfig.NODE_ENV;

  if (env !== NODE_ENV.PROD) {
    useSwagger(app);
  }

  app.enableShutdownHooks();

  await app.listen(port);
}

bootstrap();
