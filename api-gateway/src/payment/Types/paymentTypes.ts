import { Observable } from 'rxjs';
import {
  PaymentType,
  PaymentStatus,
  PaymentMethod,
  PaymentGateway,
} from '../entities/payment.entity';

// Payment response type
export interface GrpcPaymentResponse {
  id: string;
  userId: string;
  amount: number;
  paymentType: PaymentType;
  dueAmount: number;
  lastDueDate: string; // ISO 8601 format
  paymentDate: string; // ISO 8601 format
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  paymentGateway?: PaymentGateway;
  reminderSentDates: string[];
  lateFee: number;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Create payment request
export interface CreatePaymentRequest {
  userId: string;
  amount: number;
  paymentType: PaymentType;
  dueAmount: number; // Required
  lastDueDate: string; // Required
  paymentMethod: PaymentMethod; // Required
  paymentGateway: PaymentGateway; // Required
  lateFee: number; // Required
  remarks: string; // Required
  paymentDate: string; // Required
}

// Update payment status request
export interface UpdatePaymentStatusRequest {
  id: string;
  paymentStatus: PaymentStatus;
  transactionId?: string;
  paymentGateway?: PaymentGateway;
  paymentDate: string; // Required
}

// Get payment history request
export interface GetPaymentHistoryRequest {
  userId: string;
  paymentType?: PaymentType;
  paymentStatus?: PaymentStatus;
  startDate?: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format
}

// Get payment history response
export interface GetPaymentHistoryResponse {
  payments: GrpcPaymentResponse[];
  message: string;
}

// gRPC service interface
export interface PaymentGrpcService {
  CreatePayment(data: CreatePaymentRequest): Observable<GrpcPaymentResponse>;
  UpdatePaymentStatus(
    data: UpdatePaymentStatusRequest,
  ): Observable<GrpcPaymentResponse>;
  GetPaymentHistory(
    data: GetPaymentHistoryRequest,
  ): Observable<GetPaymentHistoryResponse>;
}
