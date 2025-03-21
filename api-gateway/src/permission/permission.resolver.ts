import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import {
  Permission,
  CreatePermissionInput,
  UpdatePermissionInput,
  GetAllPermissionsInput,
  GetAllPermissionsOutput,
  DeletePermissionOutput,
  CreateManyPermissionsInput,
  CreateManyPermissionsOutput,
  DeleteManyPermissionsInput,
  DeleteManyPermissionsOutput,
  GetManyPermissionsResponse,
} from './entities/permission.entity';
import { GraphQLError } from 'graphql';
import { Permissions } from 'src/shared/guards/decorator/permissions.decorator';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => Permission)
  @Permissions('user:manage-roles')
  async createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ): Promise<Permission> {
    try {
      return await this.permissionService.createPermission(
        createPermissionInput,
      );
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

  @Query(() => GetAllPermissionsOutput)
  @Permissions('user:manage-roles')
  async getAllPermissions(
    @Args('getAllPermissionsInput')
    getAllPermissionsInput: GetAllPermissionsInput,
  ): Promise<GetAllPermissionsOutput> {
    try {
      return await this.permissionService.getAllPermissions(
        getAllPermissionsInput,
      );
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Query(() => Permission)
  @Permissions('user:manage-roles')
  async getPermission(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Permission> {
    try {
      return await this.permissionService.getPermission(id);
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

  @Mutation(() => Permission)
  @Permissions('user:manage-roles')
  async updatePermission(
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  ): Promise<Permission> {
    try {
      return await this.permissionService.updatePermission(
        updatePermissionInput,
      );
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

  @Mutation(() => DeletePermissionOutput)
  @Permissions('user:manage-roles')
  async deletePermission(
    @Args('id', { type: () => String }) id: string,
  ): Promise<DeletePermissionOutput> {
    try {
      return await this.permissionService.deletePermission(id);
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

  @Mutation(() => CreateManyPermissionsOutput)
  @Permissions('user:manage-roles')
  async createManyPermissions(
    @Args('createManyPermissionsInput')
    createManyPermissionsInput: CreateManyPermissionsInput,
  ): Promise<CreateManyPermissionsOutput> {
    try {
      return await this.permissionService.createManyPermissions(
        createManyPermissionsInput,
      );
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

  @Mutation(() => DeleteManyPermissionsOutput)
  @Permissions('user:manage-roles')
  async deleteManyPermissions(
    @Args('deleteManyPermissionsInput')
    deleteManyPermissionsInput: DeleteManyPermissionsInput,
  ): Promise<DeleteManyPermissionsOutput> {
    try {
      return await this.permissionService.deleteManyPermissions(
        deleteManyPermissionsInput,
      );
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

  @Query(() => GetManyPermissionsResponse, { name: 'getManyPermissions' })
  @Permissions('user:manage-roles')
  async getManyPermissions(
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Promise<GetManyPermissionsResponse> {
    try {
      return await this.permissionService.getManyPermissions(ids);
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
