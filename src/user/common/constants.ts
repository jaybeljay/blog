import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const UsersController = (): ClassDecorator =>
  applyDecorators(Controller('users'), ApiTags('Users'));
