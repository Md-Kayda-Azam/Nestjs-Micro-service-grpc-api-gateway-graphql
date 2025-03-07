import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Device {
  @Field()
  deviceId: string;

  @Field()
  ipAddress: string;

  @Field()
  userAgent: string;

  @Field({ nullable: true })
  location?: string;
}
