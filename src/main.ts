import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NODE_ENV } from './common/types';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

const useSwagger = (app: NestExpressApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Blog API')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('app.port');
  const env = config.get('app.env');

  if (env !== NODE_ENV.PROD) {
    useSwagger(app);
  }

  const logger = app.get(Logger);
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableShutdownHooks();

  await app.listen(port);
}

bootstrap();
