import {
  PaymentType,
  PaymentStatus,
  PaymentMethod,
  PaymentGateway,
} from '../schema/payment.schema';

export interface CreatePaymentRequest {
  userId: string;
  amount: number;
  paymentType: PaymentType;
  dueAmount: number;
  lastDueDate: string; // ISO 8601 format
  paymentDate: string; // ISO 8601 format
  paymentMethod: PaymentMethod;
  paymentGateway: PaymentGateway;
  paymentStatus: PaymentStatus;
  lateFee: number;
  remarks: string;
}

export interface CreatePaymentResponse {
  id: string;
  userId: string;
  amount: number;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  message: string;
}

export interface UpdatePaymentStatusRequest {
  id: string;
  paymentStatus: PaymentStatus;
  transactionId: string;
  paymentGateway: PaymentGateway;
  paymentDate: string; // ISO 8601 format
}

export interface UpdatePaymentStatusResponse {
  id: string;
  paymentStatus: PaymentStatus;
  message: string;
}

export interface GetPaymentHistoryRequest {
  userId: string;
  paymentType?: PaymentType;
  paymentStatus?: PaymentStatus;
  startDate?: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  paymentType: PaymentType;
  dueAmount: number;
  lastDueDate: string; // ISO 8601 format
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId: string;
  paymentGateway: PaymentGateway;
  reminderSentDates: string[]; // ISO 8601 format
  paymentDate: string; // ISO 8601 format
  lateFee: number;
  remarks: string;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}

export interface GetPaymentHistoryResponse {
  payments: Payment[];
  message: string;
}
