import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './jwt-config.service';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    NestJwtModule.registerAsync({ useClass: JwtConfigService }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService],
})
export class JwtModule {}
