import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role, RoleSchema } from '../schemas/role.schema';
import { Permission, PermissionSchema } from '../schemas/permission.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
  ],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
