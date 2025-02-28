import { PaginationResponseDto } from 'src/common/dto/pagination.response.dto';
import { UserResponseDto } from 'src/user/common/dto/user.response.dto';

export class UsersResponseDto extends PaginationResponseDto<UserResponseDto> {}
