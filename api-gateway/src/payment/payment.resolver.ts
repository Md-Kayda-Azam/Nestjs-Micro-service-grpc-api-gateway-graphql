import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import {
  Payment,
  CreatePaymentInput,
  UpdatePaymentStatusInput,
  GetPaymentHistoryInput,
  GetPaymentHistoryOutput,
} from './entities/payment.entity';
import { GraphQLError } from 'graphql';
import { Permissions } from 'src/shared/guards/decorator/permissions.decorator';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  async createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ): Promise<Payment> {
    try {
      return await this.paymentService.createPayment(createPaymentInput);
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

  @Mutation(() => Payment)
  async updatePaymentStatus(
    @Args('updatePaymentStatusInput')
    updatePaymentStatusInput: UpdatePaymentStatusInput,
  ): Promise<Payment> {
    try {
      return await this.paymentService.updatePaymentStatus(
        updatePaymentStatusInput,
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

  @Query(() => GetPaymentHistoryOutput)
  async getPaymentHistory(
    @Args('getPaymentHistoryInput')
    getPaymentHistoryInput: GetPaymentHistoryInput,
  ): Promise<GetPaymentHistoryOutput> {
    try {
      return await this.paymentService.getPaymentHistory(
        getPaymentHistoryInput,
      );
    } catch (error) {
      throw new GraphQLError(error.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
  }
}
