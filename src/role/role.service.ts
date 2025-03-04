import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from '../schemas/role.schema';
import { Permission } from '../schemas/permission.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async createRole(name: string, permissionIds: string[]): Promise<Role> {
    try {
      const objectIdPermissions = permissionIds.map(id => new Types.ObjectId(id));
      const permissions = await this.permissionModel.find({ _id: { $in: objectIdPermissions } }).exec();
      const role = new this.roleModel({ name, permissions });
      return await role.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating role');
    }
  }
}