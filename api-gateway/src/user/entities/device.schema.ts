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

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}
