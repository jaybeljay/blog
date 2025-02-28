import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../constants';

export class PaginationRequestDto {
  /**
   * Номер страницы
   * @example 1
   */
  @Expose()
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional()
  page?: number = DEFAULT_PAGE;

  /**
   * Количество элементов на странице
   * @example 10
   */
  @Expose()
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional()
  limit?: number = DEFAULT_LIMIT;
}
