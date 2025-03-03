import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtPermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.get<{ module: string; action: 'read' | 'create' | 'update' }>(
      'permissions',
      context.getHandler()
    );
    if (!requiredPermission) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new ForbiddenException('Not authenticated');

    const hasAccess = await this.usersService.hasPermission(user.id, requiredPermission.module, requiredPermission.action);
    if (!hasAccess) throw new ForbiddenException('Access denied');

    return true;
  }
}