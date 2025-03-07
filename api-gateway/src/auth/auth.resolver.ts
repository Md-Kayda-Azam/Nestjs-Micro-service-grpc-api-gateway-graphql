import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/shared/schema/user.entity';
import { GraphQLError } from 'graphql';
import {
  loginInput,
  resendVerificationInput,
  verifyAccountInput,
} from './dto/auth.input';
import { ResponseMessage } from './dto/responseMassage';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LogoutResponse } from './dto/LogoutResponse';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async verifyAccount(
    @Args('input', { type: () => verifyAccountInput })
    input: verifyAccountInput,
  ): Promise<User> {
    try {
      const user = await this.authService.verifyAccount(input);
      return user;
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('Invalid Token')
            ? 'ALREADY_EXISTS'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => ResponseMessage)
  async resendVerification(
    @Args('input', { type: () => resendVerificationInput })
    input: resendVerificationInput,
  ): Promise<ResponseMessage> {
    try {
      return await this.authService.resendVerification(input);
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('User not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @Mutation(() => User)
  async login(
    @Args('input', { type: () => loginInput }) input: loginInput,
    @Context('req') request: Request,
  ): Promise<User> {
    try {
      const enhancedInput = {
        ...input,
        userAgent: request.headers['user-agent'] || 'Unknown', // HTTP থেকে User-Agent
        // ipAddress: request.ip || '127.0.0.1', // HTTP থেকে IP
      };
      const user = await this.authService.login(enhancedInput);
      return user;
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.message.includes('User not found')
            ? 'NOT_FOUND'
            : 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async me(@Context('req') request: Request): Promise<User> {
    const headers = request.headers as { authorization?: string }; // টাইপ Assertion
    const token = headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No token provided');
    }
    const user = await this.authService.getMe(token);
    return user;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => LogoutResponse)
  async logout(@Context('req') request: Request): Promise<LogoutResponse> {
    const headers = request.headers as { authorization?: string }; // টাইপ Assertion
    const token = headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('No token provided');
    }
    return this.authService.logout(token);
  }
}

// @Query(() => Auth, { name: 'auth' })
// findOne(@Args('id', { type: () => Int }) id: number) {
//   return this.authService.findOne(id);
// }

// @Mutation(() => Auth)
// updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
//   return this.authService.update(updateAuthInput.id, updateAuthInput);
// }

// @Mutation(() => Auth)
// removeAuth(@Args('id', { type: () => Int }) id: number) {
//   return this.authService.remove(id);
// }
