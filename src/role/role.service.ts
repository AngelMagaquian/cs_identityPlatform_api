import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/schemas/role.schema';
import { Permission } from 'src/schemas/permission.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async createRole(name: string, permissionIds: string[]) {
    const permissions = await this.permissionModel.find({ _id: { $in: permissionIds } });
    return this.roleModel.create({ name, permissions });
  }
}