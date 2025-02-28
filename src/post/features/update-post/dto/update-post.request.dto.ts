import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from '../../create-post/dto/create-post.request.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
