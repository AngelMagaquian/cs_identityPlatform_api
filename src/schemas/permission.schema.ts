import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Permission extends Document {
  @Prop({ required: true })
  module: string; // Ejemplo: 'users', 'reports', 'settings'

  @Prop({ default: false })
  read: boolean;

  @Prop({ default: false })
  create: boolean;

  @Prop({ default: false })
  update: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);