import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const PostsController = (): ClassDecorator =>
  applyDecorators(Controller('posts'), ApiTags('Posts'));
