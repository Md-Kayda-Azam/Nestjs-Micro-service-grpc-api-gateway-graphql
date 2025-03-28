import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoleService } from './role.service';
import {
  Role,
  CreateRoleInput,
  UpdateRoleInput,
  GetAllRolesInput,
  GetAllRolesOutput,
  DeleteRoleOutput,
  CreateManyRolesInput,
  CreateManyRolesOutput,
  DeleteManyRolesInput,
  DeleteManyRolesOutput,
} from './entities/role.entity';
import { GraphQLError } from 'graphql';
import { Permissions } from 'src/shared/guards/decorator/permissions.decorator';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  @Permissions('user:manage-roles')
  async createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    try {
      return await this.roleService.createRole(createRoleInput);
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

  @Query(() => GetAllRolesOutput)
  @Permissions('user:manage-roles')
  async getAllRoles(
    @Args('getAllRolesInput') getAllRolesInput: GetAllRolesInput,
  ): Promise<GetAllRolesOutput> {
    try {
      return await this.roleService.getAllRoles(getAllRolesInput);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Query(() => Role)
  @Permissions('user:manage-roles')
  async getRole(@Args('id', { type: () => String }) id: string): Promise<Role> {
    try {
      return await this.roleService.getRole(id);
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

  @Mutation(() => Role)
  @Permissions('user:manage-roles')
  async updateRole(
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ): Promise<Role> {
    try {
      return await this.roleService.updateRole(updateRoleInput);
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

  @Mutation(() => DeleteRoleOutput)
  @Permissions('user:manage-roles')
  async deleteRole(
    @Args('id', { type: () => String }) id: string,
  ): Promise<DeleteRoleOutput> {
    try {
      return await this.roleService.deleteRole(id);
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

  @Mutation(() => CreateManyRolesOutput)
  @Permissions('user:manage-roles')
  async createManyRoles(
    @Args('createManyRolesInput') createManyRolesInput: CreateManyRolesInput,
  ): Promise<CreateManyRolesOutput> {
    try {
      return await this.roleService.createManyRoles(createManyRolesInput);
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

  @Mutation(() => DeleteManyRolesOutput)
  @Permissions('user:manage-roles')
  async deleteManyRoles(
    @Args('deleteManyRolesInput') deleteManyRolesInput: DeleteManyRolesInput,
  ): Promise<DeleteManyRolesOutput> {
    try {
      return await this.roleService.deleteManyRoles(deleteManyRolesInput);
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
