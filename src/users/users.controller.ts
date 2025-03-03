import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtPermissionsGuard } from '../auth/jwt-permissions.guard';
import { RequirePermission } from '../common/decorators/require_permission.decorator';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @RequirePermission('users', 'create')
  @UseGuards(JwtPermissionsGuard)
  async register(@Body() body) {
    const { username, email, pass, role } = body;
    return this.usersService.createUser(username, email, pass, role);
  }

}
