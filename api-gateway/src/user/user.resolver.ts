import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { GraphQLError } from 'graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input'; // New DTO for update
import { UserService } from './user.service';
import { VerifyUserInput } from './dto/verify-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
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
  async findOne(@Args('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findUser(id);
      if (!user._id) {
        throw new Error('User ID is missing in the response');
      }
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
              : error.message.includes('already exists')
                ? 'ALREADY_EXISTS'
                : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => Boolean)
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

  @Mutation(() => User)
  async verifyUser(
    @Args('input', { type: () => VerifyUserInput })
    input: VerifyUserInput,
  ): Promise<User> {
    try {
      const user = await this.userService.verifyUser(input); // gRPC কল
      return user;
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code:
            error.message === 'Invalid or expired verification token'
              ? 'NOT_FOUND'
              : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }
}
