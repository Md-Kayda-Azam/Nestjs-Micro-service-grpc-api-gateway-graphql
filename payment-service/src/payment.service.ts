import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schema/payment.schema';
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  UpdatePaymentStatusRequest,
  UpdatePaymentStatusResponse,
  GetPaymentHistoryRequest,
  GetPaymentHistoryResponse,
} from './types/payment.interface';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
  ) {}

  async createPayment(
    data: CreatePaymentRequest,
  ): Promise<CreatePaymentResponse> {
    const newPayment = new this.paymentModel({
      userId: data.userId, // Assumes userId is already a string (convert if needed)
      amount: data.amount,
      paymentType: data.paymentType,
      dueAmount: data.dueAmount || 0,
      lastDueDate: new Date(data.lastDueDate),
      paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
      paymentMethod: data.paymentMethod,
      paymentGateway: data.paymentGateway,
      paymentStatus: data.paymentStatus || 'pending',
      lateFee: data.lateFee || 0,
      remarks: data.remarks || '',
    });

    const savedPayment = await newPayment.save();

    return {
      id: savedPayment._id.toString(),
      userId: savedPayment.userId.toString(),
      amount: savedPayment.amount,
      paymentType: savedPayment.paymentType,
      paymentStatus: savedPayment.paymentStatus,
      message: 'Payment created successfully',
    };
  }

  async updatePaymentStatus(
    data: UpdatePaymentStatusRequest,
  ): Promise<UpdatePaymentStatusResponse> {
    const payment = await this.paymentModel.findById(data.id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.paymentStatus = data.paymentStatus;
    if (data.transactionId) payment.transactionId = data.transactionId;
    if (data.paymentGateway) payment.paymentGateway = data.paymentGateway;
    if (data.paymentDate) payment.paymentDate = new Date(data.paymentDate);

    const updatedPayment = await payment.save();

    return {
      id: updatedPayment._id.toString(),
      paymentStatus: updatedPayment.paymentStatus,
      message: 'Payment status updated successfully',
    };
  }

  async getPaymentHistory(
    data: GetPaymentHistoryRequest,
  ): Promise<GetPaymentHistoryResponse> {
    const query: any = { userId: data.userId };

    if (data.paymentType) query.paymentType = data.paymentType;
    if (data.paymentStatus) query.paymentStatus = data.paymentStatus;
    if (data.startDate && data.endDate) {
      query.createdAt = {
        $gte: new Date(data.startDate),
        $lte: new Date(data.endDate),
      };
    }

    const payments = await this.paymentModel
      .find(query)
      .sort({ createdAt: -1 });

    return {
      payments: payments.map((payment) => ({
        id: payment._id.toString(),
        userId: payment.userId.toString(),
        amount: payment.amount,
        paymentType: payment.paymentType,
        dueAmount: payment.dueAmount,
        lastDueDate: payment.lastDueDate.toISOString(),
        paymentStatus: payment.paymentStatus,
        paymentMethod: payment.paymentMethod,
        transactionId: payment.transactionId || '',
        paymentGateway: payment.paymentGateway || '',
        reminderSentDates: payment.reminderSentDates.map((date) =>
          date.toISOString(),
        ),
        paymentDate: payment.paymentDate?.toISOString() || '',
        lateFee: payment.lateFee,
        remarks: payment.remarks || '',
        createdAt: payment.createdAt.toISOString(),
        updatedAt: payment.updatedAt.toISOString(),
      })),
      message: 'Payment history retrieved successfully',
    };
  }
}
