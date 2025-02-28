import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload, JwtToken } from './jwt.types';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async createJwtToken(payload: JwtPayload): Promise<JwtToken> {
    return this.jwtService.sign(payload);
  }
}
