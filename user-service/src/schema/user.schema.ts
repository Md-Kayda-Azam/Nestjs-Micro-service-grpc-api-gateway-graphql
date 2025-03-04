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

  @Prop({ required: true })
  password: string;

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
        _id: String,
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

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  verificationOTP?: string;

  @Prop()
  verificationOtpExpires?: Date;

  @Prop()
  verificationToken?: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  otpRequestedAt?: Date;

  @Prop({ default: 0 })
  otpRequestCount?: number;

  @Prop()
  otpBlockedUntil?: Date;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: String, default: null })
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface Device {
  _id: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
