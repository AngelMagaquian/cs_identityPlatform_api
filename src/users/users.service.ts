import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    try {
      return await this.userModel.findOne({ username }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Database error');
    }
  }

  async createUser(username: string, password: string, role: string) {
    try {
      const user = new this.userModel({ username, password, role });
      return await user.save();
    } catch (error) {
      throw new NotFoundException('Database not found');
    }
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
