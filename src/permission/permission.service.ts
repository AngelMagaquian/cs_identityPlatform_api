import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from 'src/schemas/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission.name) private permissionModel: Model<Permission>) {}

  async createPermission(module: string, read: boolean, create: boolean, update: boolean) {
    return this.permissionModel.create({ module, read, create, update });
  }
}