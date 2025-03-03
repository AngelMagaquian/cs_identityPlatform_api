import { SetMetadata } from '@nestjs/common';

export const RequirePermission = (module: string, action: 'read' | 'create' | 'update') =>
  SetMetadata('permissions', { module, action });