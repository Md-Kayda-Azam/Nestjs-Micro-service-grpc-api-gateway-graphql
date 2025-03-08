import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParentDocument = Parent &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({
  timestamps: true, // স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt যোগ করে
  collection: 'parents', // কালেকশন নাম স্পষ্ট করা
  toJSON: { virtuals: true }, // ভার্চুয়াল ফিল্ডের জন্য
})
export class Parent {
  _id: string;

  @Prop({
    required: true,
    ref: 'School',
    type: String,
    index: true, // দ্রুত সার্চের জন্য
  })
  schoolId: string; // কোন স্কুলের অভিভাবক

  @Prop({
    required: true,
    type: String,
    enum: ['Father', 'Mother', 'Guardian', 'Other'], // সম্পর্কের জন্য বৈধ মান
  })
  relationshipToStudent: string; // ছাত্রের সাথে সম্পর্ক

  @Prop({
    required: true,
    type: String,
    match: /^\+?[\d\s-]{10,}$/, // ফোন নম্বর ফরম্যাট ভ্যালিডেশন
    index: true,
  })
  phoneNumber: string; // অভিভাবকের ফোন নম্বর

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // ইমেইল ফরম্যাট ভ্যালিডেশন
    trim: true,
  })
  email: string; // অভিভাবকের ইমেইল

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  address: string; // অভিভাবকের ঠিকানা

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  occupation: string; // অভিভাবকের পেশা

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
    match: /^\+?[\d\s-]{10,}$/, // ফোন নম্বর ফরম্যাট ভ্যালিডেশন
  })
  emergencyContacts: string[]; // জরুরি যোগাযোগের জন্য আরও নম্বর

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  profilePictureUrl: string; // অভিভাবকের প্রোফাইল ছবি

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
    ref: 'Student', // Student স্কিমার সাথে সম্পর্ক
  })
  associatedStudents: string[]; // যে ছাত্রদের অভিভাবক তিনি

  @Prop({
    type: Boolean,
    default: false, // ডিফল্ট false
  })
  isPrimaryGuardian: boolean; // অভিভাবক কি মূল অভিভাবক

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  notes: string; // অভিভাবকের বিষয়ে যে কোনো মন্তব্য
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
