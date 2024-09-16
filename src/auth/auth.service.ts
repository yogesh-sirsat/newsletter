import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      organization_id: user.organization_id,
    };
    console.log(payload);
    const access_token = this.jwtService.sign(payload);
    console.log(access_token);
    return {
      access_token,
    };
  }
}
