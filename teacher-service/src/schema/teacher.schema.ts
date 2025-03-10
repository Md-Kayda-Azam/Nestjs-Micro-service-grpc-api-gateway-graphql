import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeacherDocument = Teacher &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({
  timestamps: true, // স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt যোগ করে
  collection: 'teachers', // কালেকশন নাম স্পষ্ট করা
  toJSON: { virtuals: true }, // ভার্চুয়াল ফিল্ডের জন্য
})
export class Teacher {
  _id: string;

  @Prop({
    required: true,
    ref: 'School',
    type: String,
    index: true, // দ্রুত সার্চের জন্য
  })
  schoolId: string; // কোন স্কুলের শিক্ষক

  @Prop({
    required: true,
    type: String,
    unique: true, // ইউনিক ইমেইল
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // ইমেইল ফরম্যাট ভ্যালিডেশন
    index: true,
  })
  email: string; // শিক্ষক/শিক্ষিকার ইমেইল

  @Prop({
    required: true,
    type: String,
    match: /^\+?[\d\s-]{10,}$/, // ফোন নম্বর ফরম্যাট ভ্যালিডেশন
    index: true,
  })
  phoneNumber: string; // শিক্ষক/শিক্ষিকার ফোন নম্বর

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  address: string | null; // শিক্ষক/শিক্ষিকার ঠিকানা

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  subject: string; // শিক্ষক/শিক্ষিকার বিষয়

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
  })
  qualifications: string[]; // শিক্ষকের যোগ্যতা

  @Prop({
    required: true,
    type: Date,
    validate: {
      validator: (v: Date) => !isNaN(v.getTime()),
      message: 'Invalid hireDate',
    },
  })
  hireDate: Date; // নিয়োগের তারিখ

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  profilePictureUrl: string | null; // শিক্ষক/শিক্ষিকার প্রোফাইল ছবি (URL)

  @Prop({
    required: true,
    type: String,
    enum: ['Active', 'Inactive'], // স্ট্যাটাসের জন্য বৈধ মান
  })
  status: string; // শিক্ষক/শিক্ষিকার স্ট্যাটাস

  @Prop({
    type: Date,
    default: null, // ডিফল্ট null
    validate: {
      validator: (v: Date) => !isNaN(v.getTime()),
      message: 'Invalid dateOfBirth',
    },
  })
  dateOfBirth: Date | null; // শিক্ষক/শিক্ষিকার জন্ম তারিখ

  @Prop({
    required: true,
    type: String,
    enum: ['Male', 'Female', 'Other'], // লিঙ্গের জন্য বৈধ মান
  })
  gender: string; // শিক্ষক/শিক্ষিকার লিঙ্গ

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  nationality: string; // শিক্ষক/শিক্ষিকার জাতীয়তা

  @Prop({
    type: Object,
    validate: {
      validator: (v: Record<string, string>) => {
        if (!v) return true;
        return Object.keys(v).every(
          (key) => typeof key === 'string' && typeof v[key] === 'string',
        );
      },
      message: 'Invalid socialMediaLinks format',
    },
  })
  socialMediaLinks: Record<string, string> | null; // শিক্ষক/শিক্ষিকার সোশ্যাল মিডিয়া লিঙ্ক

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    match: /^\+?[\d\s-]{10,}$/, // ফোন নম্বর ফরম্যাট ভ্যালিডেশন
    trim: true,
  })
  emergencyContact: string | null; // শিক্ষক/শিক্ষিকার জরুরি যোগাযোগের নম্বর

  @Prop({
    type: Number,
    default: null, // ডিফল্ট null
    min: 0, // নেগেটিভ হবে না
  })
  salary: number | null; // শিক্ষক/শিক্ষিকার মাসিক বেতন

  @Prop({
    type: Number,
    default: 0, // ডিফল্ট 0
    min: 0, // নেগেটিভ হবে না
  })
  teachingExperienceYears: number; // শিক্ষক/শিক্ষিকার পড়ানোর অভিজ্ঞতার বছর

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
  })
  assignedClasses: string[]; // শিক্ষক/শিক্ষিকার শ্রেণি/ক্লাসের তালিকা

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
  })
  assignedSubjects: string[]; // শিক্ষক/শিক্ষিকার পড়ানো বিষয়গুলোর তালিকা

  @Prop({
    type: Number,
    default: 0, // ডিফল্ট 0
    min: 0, // নেগেটিভ হবে না
  })
  studentCount: number; // শিক্ষকের তত্ত্বাবধানে ছাত্রের সংখ্যা
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
