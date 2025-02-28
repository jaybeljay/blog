import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../create-user/dto/create-user.request.dto';

export class ChangePasswordDto extends PickType(CreateUserDto, ['password']) {}
