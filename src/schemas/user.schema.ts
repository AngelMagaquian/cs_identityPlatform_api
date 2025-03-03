import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from './role.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  pass: string;

  @Prop({ type: Types.ObjectId, ref: 'Role', default:null })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);