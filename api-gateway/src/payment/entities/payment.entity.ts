import { ObjectType, Field, InputType, Float } from '@nestjs/graphql';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

// Enum for payment types
export enum PaymentType {
  ADMISSION_FEE = 'admission_fee',
  MONTHLY_FEE = 'monthly_fee',
  EXAM_FEE = 'exam_fee',
  TRANSPORT_FEE = 'transport_fee',
  TEACHER_SALARY = 'teacher_salary',
  OTHER = 'other',
}

// Enum for payment statuses
export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

// Enum for payment methods
export enum PaymentMethod {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

// Enum for payment gateways
export enum PaymentGateway {
  BKASH = 'bkash',
  NAGAD = 'nagad',
  ROCKET = 'rocket',
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  OTHER = 'other',
}

@ObjectType()
export class Payment {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  userId: string | null; // Now nullable

  @Field(() => Float, { nullable: true })
  amount: number | null; // Now nullable

  @Field(() => String, { nullable: true })
  @IsEnum(PaymentType, { message: 'Invalid payment type' })
  paymentType: PaymentType | null; // Now nullable

  @Field(() => Float, { nullable: true })
  dueAmount: number | null;

  @Field(() => Date, { nullable: true })
  lastDueDate: Date | null;

  @Field(() => Date, { nullable: true })
  paymentDate: Date | null;

  @Field(() => String, { nullable: true })
  @IsEnum(PaymentStatus, { message: 'Invalid payment status' })
  paymentStatus: PaymentStatus | null;

  @Field(() => String, { nullable: true })
  @IsEnum(PaymentMethod, { message: 'Invalid payment method' })
  paymentMethod: PaymentMethod | null;

  @Field(() => String, { nullable: true })
  transactionId?: string | null;

  @Field(() => String, { nullable: true })
  @IsEnum(PaymentGateway, { message: 'Invalid payment gateway' })
  paymentGateway?: PaymentGateway | null;

  @Field(() => [String], { nullable: true })
  reminderSentDates: string[] | null;

  @Field(() => Float, { nullable: true })
  lateFee: number | null;

  @Field(() => String, { nullable: true })
  remarks?: string | null;

  @Field(() => String, { nullable: true })
  createdAt?: string | null;

  @Field(() => String, { nullable: true })
  updatedAt?: string | null;
}

@InputType()
export class CreatePaymentInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @IsNotEmpty({ message: 'Amount is required' })
  amount: number;

  @Field(() => String)
  @IsEnum(PaymentType, { message: 'Invalid payment type' })
  @IsNotEmpty({ message: 'Payment type is required' })
  paymentType: PaymentType;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  dueAmount?: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  lastDueDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  paymentDate?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentMethod, { message: 'Invalid payment method' })
  paymentMethod?: PaymentMethod;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentGateway, { message: 'Invalid payment gateway' })
  paymentGateway?: PaymentGateway;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  lateFee?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  remarks?: string;
}

@InputType()
export class UpdatePaymentStatusInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Id is required' })
  _id: string;

  @Field(() => String)
  @IsEnum(PaymentStatus, { message: 'Invalid payment status' })
  @IsNotEmpty({ message: 'Payment status is required' })
  paymentStatus: PaymentStatus;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentGateway, { message: 'Invalid payment gateway' })
  paymentGateway?: PaymentGateway;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  paymentDate?: Date;
}

@InputType()
export class GetPaymentHistoryInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentType, { message: 'Invalid payment type' })
  paymentType?: PaymentType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentStatus, { message: 'Invalid payment status' })
  paymentStatus?: PaymentStatus;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;
}

@ObjectType()
export class GetPaymentHistoryOutput {
  @Field(() => [Payment])
  payments: Payment[];

  @Field(() => String)
  message: string;
}
