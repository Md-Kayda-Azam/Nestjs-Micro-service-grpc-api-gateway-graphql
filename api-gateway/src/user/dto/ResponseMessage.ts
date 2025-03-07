import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ResponseMessage {
  @Field()
  message: string;

  @Field({ nullable: true }) // Optional
  code?: string;
}
