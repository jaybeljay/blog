import { Module } from '@nestjs/common';
import { SignInController } from './features/sign-in/sign-in.controller';
import { SignInService } from './features/sign-in/sign-in.service';
import { SignUpController } from './features/sign-up/sign-up.controller';
import { SignUpService } from './features/sign-up/sign-up.service';
import { JwtModule } from 'src/third-party/jwt';
import { BcryptModule } from 'src/third-party/bcrypt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule,
    BcryptModule,
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [SignInController, SignUpController],
  providers: [SignInService, SignUpService],
})
export class AuthModule {}
