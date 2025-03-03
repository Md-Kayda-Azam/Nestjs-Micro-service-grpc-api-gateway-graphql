import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { GraphQLError } from 'graphql';

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
      return await this.userService.findUser(id);
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
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<User> {
    try {
      return await this.userService.createUser({ name, email });
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
}
