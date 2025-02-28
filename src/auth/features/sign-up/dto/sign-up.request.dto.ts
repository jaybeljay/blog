import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ExceptionTypes } from 'src/lib/exceptions/exceptions.types';

export class SignUpRequestDto {
  @ApiProperty({ description: `User's name`, example: 'ivanivanov' })
  @IsString()
  @MaxLength(255)
  username: string;

  @ApiProperty({ description: `User's password`, example: 'Qwerty1$' })
  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: ExceptionTypes.PASSWORD_DOES_NOT_MEET_REQUIREMENTS,
    },
  )
  password: string;
}
