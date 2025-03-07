import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  school: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastActive?: Date;

  @Prop({ default: false })
  mfaEnabled: boolean;

  @Prop()
  mfaSecret?: string;

  @Prop({
    type: [
      {
        deviceId: String,
        ipAddress: String,
        userAgent: String,
        location: String,
        createdAt: Date,
        updatedAt: Date,
      },
    ],
    default: [],
  })
  devices?: Device[];

  @Prop({ type: [String], default: [] })
  notifications?: string[];

  @Prop()
  lastPasswordChanged?: Date;

  @Prop()
  resetPasswordToken?: string;

  @Prop()
  resetPasswordExpires?: Date;

  @Prop({ type: Date, default: null })
  resetRequestedAt?: Date;

  @Prop({ type: Number, default: 0 })
  resetRequestCount?: number;

  @Prop({ type: Date, default: null })
  resetBlockedUntil?: Date;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  verificationToken?: string;

  @Prop()
  verificationTokenExpires?: Date;

  @Prop({ type: Date, default: null })
  verificationRequestedAt?: Date;

  @Prop({ type: Number, default: 0 })
  verificationRequestCount?: number;

  @Prop({ type: Date, default: null })
  verificationBlockedUntil?: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: String, default: null })
  refreshToken?: string | null;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface Device {
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
}
