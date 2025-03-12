import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// Enums
export enum PaymentType {
  ADMISSION_FEE = 'admission_fee',
  MONTHLY_FEE = 'monthly_fee',
  EXAM_FEE = 'exam_fee',
  TRANSPORT_FEE = 'transport_fee',
  TEACHER_SALARY = 'teacher_salary',
  OTHER = 'other',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export enum PaymentGateway {
  BKASH = 'bkash',
  NAGAD = 'nagad',
  ROCKET = 'rocket',
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  OTHER = 'other',
}

// Payment interface (Type definition)
export interface Payment {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  amount: number;
  paymentType: PaymentType;
  dueAmount: number;
  lastDueDate: Date;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId: string;
  paymentGateway: PaymentGateway;
  reminderSentDates: Date[];
  paymentDate: Date;
  lateFee: number;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment document type
export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Number, min: 0 })
  amount: number;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(PaymentType),
  })
  paymentType: PaymentType;

  @Prop({ required: false, type: Number, default: 0, min: 0 })
  dueAmount: number;

  @Prop({ required: true, type: Date })
  lastDueDate: Date;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(PaymentStatus),
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(PaymentMethod),
    default: PaymentMethod.ONLINE,
  })
  paymentMethod: PaymentMethod;

  @Prop({ required: false, type: String })
  transactionId: string;

  @Prop({
    required: false,
    type: String,
    enum: Object.values(PaymentGateway),
  })
  paymentGateway: PaymentGateway;

  @Prop({ type: [Date], default: [] })
  reminderSentDates: Date[];

  @Prop({ required: false, type: Date })
  paymentDate: Date;

  @Prop({ required: false, type: Number, default: 0, min: 0 })
  lateFee: number;

  @Prop({ required: false, type: String })
  remarks: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
