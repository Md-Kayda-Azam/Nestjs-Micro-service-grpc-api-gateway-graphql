import { CreateParentInput } from './create-parent.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateParentInput extends PartialType(CreateParentInput) {
  @Field(() => Int)
  id: number;
}
