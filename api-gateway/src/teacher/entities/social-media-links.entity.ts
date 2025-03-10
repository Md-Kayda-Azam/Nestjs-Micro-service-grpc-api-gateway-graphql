import { Field, ObjectType, InputType } from '@nestjs/graphql';

// Output type (for queries)
@ObjectType()
export class SocialMediaLinks {
  @Field(() => String, { nullable: true })
  facebook?: string;

  @Field(() => String, { nullable: true })
  twitter?: string;

  @Field(() => String, { nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  instagram?: string;
}

// Input type (for mutations)
@InputType()
export class SocialMediaLinksInput {
  @Field(() => String, { nullable: true })
  facebook?: string;

  @Field(() => String, { nullable: true })
  twitter?: string;

  @Field(() => String, { nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  instagram?: string;
}
