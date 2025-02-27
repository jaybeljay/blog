import { RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModuleAsyncParams } from 'nestjs-pino/params';
import { NODE_ENV } from 'src/common/types';

export const LoggerConfig: LoggerModuleAsyncParams = {
  useFactory: async (config: ConfigService) => {
    const env = config.get<NODE_ENV>('app.NODE_ENV');

    return {
      pinoHttp: {
        level: env !== NODE_ENV.PROD ? 'debug' : 'info',
        autoLogging: true,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            translateTime: 'dd.mm.yyyy, hh:MM:ss',
          },
        },
      },
      exclude: [{ method: RequestMethod.ALL, path: '/' }],
    };
  },
  inject: [ConfigService],
};
