import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParentService } from './parent.service';
import { Parent } from './entities/parent.entity';
import { CreateParentInput } from './dto/create-parent.input';
import { UpdateParentInput } from './dto/update-parent.input';

@Resolver(() => Parent)
export class ParentResolver {
  constructor(private readonly parentService: ParentService) {}

  @Mutation(() => Parent)
  createParent(@Args('createParentInput') createParentInput: CreateParentInput) {
    return this.parentService.create(createParentInput);
  }

  @Query(() => [Parent], { name: 'parent' })
  findAll() {
    return this.parentService.findAll();
  }

  @Query(() => Parent, { name: 'parent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parentService.findOne(id);
  }

  @Mutation(() => Parent)
  updateParent(@Args('updateParentInput') updateParentInput: UpdateParentInput) {
    return this.parentService.update(updateParentInput.id, updateParentInput);
  }

  @Mutation(() => Parent)
  removeParent(@Args('id', { type: () => Int }) id: number) {
    return this.parentService.remove(id);
  }
}
