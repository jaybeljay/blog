import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const AuthController = (): ClassDecorator =>
  applyDecorators(Controller('auth'), ApiTags('Auth'));
