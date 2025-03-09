import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({ timestamps: true })
export class Permission {
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: null })
  description?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
