import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptModule } from 'src/third-party/bcrypt';
import { UserRepository } from './repositories/user.repository';
import { ChangePasswordController } from './features/change-password/change-password.controller';
import { ChangePasswordService } from './features/change-password/change-password.service';
import { CreateUserController } from './features/create-user/create-user.controller';
import { CreateUserService } from './features/create-user/create-user.service';
import { DeleteUserController } from './features/delete-user/delete-user.controller';
import { DeleteUserService } from './features/delete-user/delete-user.service';
import { GetUsersController } from './features/get-many-users/get-users.controller';
import { GetUsersService } from './features/get-many-users/get-users.service';
import { GetUserController } from './features/get-one-user/get-user.controller';
import { GetUserService } from './features/get-one-user/get-user.service';
import { UpdateUserController } from './features/update-user/update-user.controller';
import { UpdateUserService } from './features/update-user/update-user.service';
import { User } from './entities/user.entity';

const repos = [UserRepository];
const services = [
  ChangePasswordService,
  CreateUserService,
  DeleteUserService,
  GetUsersService,
  GetUserService,
  UpdateUserService,
];

@Module({
  imports: [BcryptModule, TypeOrmModule.forFeature([User])],
  controllers: [
    ChangePasswordController,
    CreateUserController,
    DeleteUserController,
    GetUsersController,
    GetUserController,
    UpdateUserController,
  ],
  providers: [...repos, ...services],
  exports: [UserRepository],
})
export class UserModule {}
