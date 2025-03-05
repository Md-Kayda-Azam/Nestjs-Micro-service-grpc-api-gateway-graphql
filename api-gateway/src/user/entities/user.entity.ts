import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Device } from './device.schema';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  school: string;

  @Field({ defaultValue: true })
  isActive: boolean;

  @Field({ nullable: true })
  lastActive?: string;

  @Field({ defaultValue: false })
  mfaEnabled: boolean;

  @Field({ nullable: true })
  mfaSecret?: string;

  @Field(() => [Device], { nullable: true })
  devices?: Device[];

  @Field(() => [String], { nullable: true, defaultValue: [] })
  notifications?: string[];

  @Field({ nullable: true })
  lastPasswordChanged?: string;

  @Field({ nullable: true })
  resetPasswordToken?: string;

  @Field({ nullable: true })
  resetPasswordExpires?: string;

  @Field({ nullable: true })
  resetRequestedAt?: string;

  @Field({ nullable: true, defaultValue: 0 })
  resetRequestCount?: number;

  @Field({ nullable: true })
  resetBlockedUntil?: string;

  @Field({ defaultValue: false })
  isVerified: boolean;

  @Field({ nullable: true })
  verificationToken?: string;

  @Field({ nullable: true })
  verificationTokenExpires?: string;

  @Field({ nullable: true })
  verificationRequestedAt?: string;

  @Field({ nullable: true, defaultValue: 0 })
  verificationRequestCount?: number;

  @Field({ nullable: true })
  verificationBlockedUntil?: string;

  @Field({ defaultValue: false })
  isDeleted: boolean;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}
