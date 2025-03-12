import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  UpdatePaymentStatusRequest,
  UpdatePaymentStatusResponse,
  GetPaymentHistoryRequest,
  GetPaymentHistoryResponse,
} from './types/payment.interface';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @GrpcMethod('PaymentService', 'CreatePayment')
  async createPayment(
    data: CreatePaymentRequest,
  ): Promise<CreatePaymentResponse> {
    return this.paymentService.createPayment(data);
  }

  @GrpcMethod('PaymentService', 'UpdatePaymentStatus')
  async updatePaymentStatus(
    data: UpdatePaymentStatusRequest,
  ): Promise<UpdatePaymentStatusResponse> {
    return this.paymentService.updatePaymentStatus(data);
  }

  @GrpcMethod('PaymentService', 'GetPaymentHistory')
  async getPaymentHistory(
    data: GetPaymentHistoryRequest,
  ): Promise<GetPaymentHistoryResponse> {
    return this.paymentService.getPaymentHistory(data);
  }
}
