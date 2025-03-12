import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PaymentGrpcService, CreatePaymentRequest } from './Types/paymentTypes';
import {
  Payment,
  CreatePaymentInput,
  UpdatePaymentStatusInput,
  GetPaymentHistoryInput,
  GetPaymentHistoryOutput,
  PaymentType,
  PaymentStatus,
  PaymentMethod,
  PaymentGateway,
} from './entities/payment.entity';

@Injectable()
export class PaymentService {
  private paymentGrpcService: PaymentGrpcService;

  constructor(@Inject('PAYMENT_PACKAGE') private client: ClientGrpc) {
    this.paymentGrpcService =
      this.client.getService<PaymentGrpcService>('PaymentService');
  }

  async createPayment(data: CreatePaymentInput): Promise<Payment> {
    try {
      const createPaymentData: CreatePaymentRequest = {
        userId: data.userId,
        amount: data.amount,
        paymentType: data.paymentType,
        dueAmount: data.dueAmount ?? 0, // Default to 0 if undefined
        lastDueDate: data.lastDueDate?.toISOString() ?? '', // Default to empty string if undefined
        paymentMethod: data.paymentMethod ?? PaymentMethod.OFFLINE, // Default to OFFLINE if undefined
        paymentGateway: data.paymentGateway ?? PaymentGateway.OTHER, // Default to OTHER if undefined
        lateFee: data.lateFee ?? 0, // Default to 0 if undefined
        remarks: data.remarks ?? '', // Default to empty string if undefined
        paymentDate: data.paymentDate?.toISOString() ?? '', // Default to empty string if undefined
      };

      const response = await lastValueFrom(
        this.paymentGrpcService.CreatePayment(createPaymentData),
      );

      return {
        _id: response.id,
        userId: response.userId,
        amount: response.amount,
        paymentType: response.paymentType,
        paymentStatus: response.paymentStatus,
        dueAmount: response.dueAmount,
        lastDueDate: response.lastDueDate
          ? new Date(response.lastDueDate)
          : null,
        paymentDate: response.paymentDate
          ? new Date(response.paymentDate)
          : null,
        paymentMethod: response.paymentMethod,
        transactionId: response.transactionId ?? '',
        paymentGateway: response.paymentGateway ?? PaymentGateway.OTHER,
        reminderSentDates: response.reminderSentDates,
        lateFee: response.lateFee,
        remarks: response.remarks ?? '',
        createdAt: response.createdAt ?? '',
        updatedAt: response.updatedAt ?? '',
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create payment');
    }
  }

  async updatePaymentStatus(data: UpdatePaymentStatusInput): Promise<Payment> {
    try {
      const updatePaymentData = {
        id: data._id,
        paymentStatus: data.paymentStatus,
        transactionId: data.transactionId ?? '',
        paymentGateway: data.paymentGateway ?? PaymentGateway.OTHER,
        paymentDate: data.paymentDate?.toISOString() ?? '',
      };

      const response = await lastValueFrom(
        this.paymentGrpcService.UpdatePaymentStatus(updatePaymentData),
      );
      console.log(response, 'response');

      return {
        _id: response.id,
        userId: null,
        amount: null,
        paymentType: null,
        dueAmount: null,
        lastDueDate: null,
        paymentStatus: response.paymentStatus,
        paymentMethod: null,
        transactionId: response.transactionId ?? '',
        paymentGateway: response.paymentGateway ?? PaymentGateway.OTHER,
        reminderSentDates: null,
        paymentDate: response.paymentDate
          ? new Date(response.paymentDate)
          : null,
        lateFee: null,
        remarks: null,
        createdAt: null,
        updatedAt: null,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to update payment status');
    }
  }

  async getPaymentHistory(
    data: GetPaymentHistoryInput,
  ): Promise<GetPaymentHistoryOutput> {
    try {
      const getPaymentHistoryData = {
        userId: data.userId,
        paymentType: data.paymentType ?? undefined,
        paymentStatus: data.paymentStatus ?? undefined,
        startDate: data.startDate?.toISOString() ?? undefined,
        endDate: data.endDate?.toISOString() ?? undefined,
      };

      const response = await lastValueFrom(
        this.paymentGrpcService.GetPaymentHistory(getPaymentHistoryData),
      );

      const payments = response.payments.map((payment) => ({
        _id: payment.id,
        userId: payment.userId,
        amount: payment.amount,
        paymentType: payment.paymentType,
        dueAmount: payment.dueAmount,
        lastDueDate: payment.lastDueDate ? new Date(payment.lastDueDate) : null,
        paymentStatus: payment.paymentStatus,
        paymentMethod: payment.paymentMethod,
        transactionId: payment.transactionId ?? '',
        paymentGateway: payment.paymentGateway ?? PaymentGateway.OTHER,
        reminderSentDates: payment.reminderSentDates,
        paymentDate: payment.paymentDate ? new Date(payment.paymentDate) : null,
        lateFee: payment.lateFee,
        remarks: payment.remarks ?? '',
        createdAt: payment.createdAt ?? '',
        updatedAt: payment.updatedAt ?? '',
      }));

      return {
        payments,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to get payment history');
    }
  }
}
