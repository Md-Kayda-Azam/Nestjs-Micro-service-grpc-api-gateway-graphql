import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateParentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
