import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtPermissionsGuard } from '../auth/jwt-permissions.guard';
import { RequirePermission } from '../common/decorators/require_permission.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard, JwtPermissionsGuard)
  @RequirePermission('users', 'create')
  async register(@Body() body) {
    const { username, email, pass, role } = body;
    return this.usersService.createUser(username, email, pass, role);
  }

  @Get('findAll')
  @UseGuards(JwtAuthGuard, JwtPermissionsGuard)
  @RequirePermission('users', 'read')
  async findAll() {
    return this.usersService.findAll();
  }
  


}
