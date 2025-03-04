import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(identifier: string, pass: string) {
    const user = await this.usersService.findOne({ username: identifier }) || await this.usersService.findOne({ email: identifier });
    if (user && await this.usersService.validatePassword(pass, user.pass)) {
      const { pass, ...result } = user;
    
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const { pass, ...payload } = user._doc;
    return { access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET}) };
  }

  
}