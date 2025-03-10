import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class Role {
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [String], ref: 'Permission', default: [] }) // Permission-এর ID গুলো
  permissionIds: string[];

  @Prop({ default: null })
  description?: string;

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
