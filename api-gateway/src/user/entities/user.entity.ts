import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Device {
  @Field(() => ID)
  _id: string;

  @Field()
  deviceId: string;

  @Field()
  ipAddress: string;

  @Field()
  userAgent: string;

  @Field({ nullable: true })
  location?: string;
}

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

  @Field({ defaultValue: false })
  mfaEnabled: boolean;

  @Field({ defaultValue: false })
  isVerified: boolean;

  @Field({ defaultValue: false })
  isDeleted: boolean;

  @Field(() => [Device], { nullable: true }) // Device array যোগ করা হলো
  devices?: Device[];

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}
