import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: `Title of post`, example: 'Template post title' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: `Description of post`,
    example: 'Template post description',
  })
  @IsString()
  description: string;
}
