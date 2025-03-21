import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input'; // New DTO for update
import { UserService } from './user.service';
import { User } from 'src/shared/schema/user.entity';
import { Permissions } from '../shared/guards/decorator/permissions.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * Find All Users
   * @returns
   */
  @Query(() => [User], { name: 'users' })
  @Permissions('user:view')
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAllUsers();
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Query(() => User, { name: 'user' })
  @Permissions('user:view')
  async findOne(@Args('email') email: string): Promise<User> {
    try {
      const user = await this.userService.findUser(email);
      return user;
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code:
            error.message === 'User not found'
              ? 'NOT_FOUND'
              : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => User)
  @Permissions('user:create')
  async createUser(
    @Args('input', { type: () => CreateUserInput })
    input: CreateUserInput,
  ): Promise<User> {
    try {
      const user = await this.userService.createUser(input);
      return user;
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

  @Mutation(() => User)
  @Permissions('user:update')
  async updateUser(
    @Args('input', { type: () => UpdateUserInput })
    input: UpdateUserInput,
  ): Promise<User> {
    try {
      const user = await this.userService.updateUser(input);
      return user;
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code:
            error.message === 'User not found'
              ? 'NOT_FOUND'
              : error.message.includes('Invalid Id')
                ? 'ALREADY_EXISTS'
                : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => Boolean)
  @Permissions('user:delete')
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    try {
      await this.userService.deleteUser(id);
      return true;
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code:
            error.message === 'User not found'
              ? 'NOT_FOUND'
              : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }
}
