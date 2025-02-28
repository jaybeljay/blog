import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../create-user/dto/create-user.request.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password']) {}
