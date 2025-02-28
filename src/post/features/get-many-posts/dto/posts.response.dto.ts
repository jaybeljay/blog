import { PaginationResponseDto } from 'src/common/dto/pagination.response.dto';
import { PostResponseDto } from 'src/post/common/dto/post.response.dto';

export class PostsResponseDto extends PaginationResponseDto<PostResponseDto> {}
