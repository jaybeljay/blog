import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationRequestDto } from 'src/common/dto/pagination.request.dto';

export class GetUsersRequestDto extends PaginationRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  username?: string;
}
