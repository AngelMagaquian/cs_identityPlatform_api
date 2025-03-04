import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Role } from '../schemas/role.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<Role>
  ) {}

  async findOne(query: { username?: string; email?: string }): Promise<User | undefined> {
    try {
      return await this.userModel.findOne(query).exec();
    } catch (error) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async findAll() {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Database error');
    }    
  }

  async createUser(username: string, email:string, pass: string, role: string) {
    try {
      const hashedPassword = await bcrypt.hash(pass, 10);
      const user = new this.userModel({ username,email, pass: hashedPassword,
      role: new Types.ObjectId(role) });
      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async validatePassword(pass: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pass, hash);
  }

  async assignRoleToUser(userId: string, roleId: string) {
    const role = await this.roleModel.findById(roleId);
    return this.userModel.findByIdAndUpdate(userId, { role }, { new: true });
  }

  async hasPermission(userId: string, module: string, action: 'read' | 'create' | 'update'): Promise<boolean> {
    const user = await this.userModel.findById(userId).populate({
      path: 'role',
      populate: {
        path: 'permissions',
        model: 'Permission' 
      }
    });
    if (!user || !user.role) return false;

    const permission = user.role.permissions.find(perm => perm.module === module);
    if (!permission) return false;

    return permission[action] === true;
  }
}
