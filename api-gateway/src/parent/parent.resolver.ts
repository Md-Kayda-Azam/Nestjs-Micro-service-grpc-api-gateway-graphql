import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParentService } from './parent.service';
import {
  Parent,
  CreateParentInput,
  UpdateParentInput,
  GetAllParentsInput,
  GetAllParentsOutput,
  DeleteParentOutput,
  CreateManyParentsInput,
  CreateManyParentsOutput,
  DeleteManyParentsInput,
  DeleteManyParentsOutput,
} from './entities/parent.entity';
import { GraphQLError } from 'graphql';

@Resolver(() => Parent)
export class ParentResolver {
  constructor(private readonly parentService: ParentService) {}

  @Mutation(() => Parent)
  async createParent(
    @Args('createParentInput') createParentInput: CreateParentInput,
  ): Promise<Parent> {
    try {
      return await this.parentService.createParent(createParentInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('already exists')
            ? 'ALREADY_EXISTS'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Query(() => GetAllParentsOutput)
  async getAllParents(
    @Args('getAllParentsInput') getAllParentsInput: GetAllParentsInput,
  ): Promise<GetAllParentsOutput> {
    try {
      return await this.parentService.getAllParents(getAllParentsInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Query(() => Parent)
  async getParent(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Parent> {
    try {
      return await this.parentService.getParent(id);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => Parent)
  async updateParent(
    @Args('updateParentInput') updateParentInput: UpdateParentInput,
  ): Promise<Parent> {
    try {
      return await this.parentService.updateParent(updateParentInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => DeleteParentOutput)
  async deleteParent(
    @Args('id', { type: () => String }) id: string,
  ): Promise<DeleteParentOutput> {
    try {
      return await this.parentService.deleteParent(id);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => CreateManyParentsOutput)
  async createManyParents(
    @Args('createManyParentsInput')
    createManyParentsInput: CreateManyParentsInput,
  ): Promise<CreateManyParentsOutput> {
    try {
      return await this.parentService.createManyParents(createManyParentsInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('already exists')
            ? 'ALREADY_EXISTS'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => DeleteManyParentsOutput)
  async deleteManyParents(
    @Args('deleteManyParentsInput')
    deleteManyParentsInput: DeleteManyParentsInput,
  ): Promise<DeleteManyParentsOutput> {
    try {
      return await this.parentService.deleteManyParents(deleteManyParentsInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }
}
