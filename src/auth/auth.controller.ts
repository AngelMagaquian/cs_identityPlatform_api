import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const {identifier, pass} = body;
    const user = await this.authService.validateUser(identifier, pass);
    return this.authService.login(user);
  }
}