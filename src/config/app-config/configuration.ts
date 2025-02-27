import { Config } from './config.interface';

export default (): Config => ({
  app: { NODE_ENV: process.env.NODE_ENV, PORT: parseInt(process.env.PORT) },
});
