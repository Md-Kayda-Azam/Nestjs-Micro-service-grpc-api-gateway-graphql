import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchoolDocument = School &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({
  timestamps: true,
  collection: 'schools', // কালেকশন নাম স্পষ্ট করা
  toJSON: { virtuals: true }, // ভার্চুয়াল ফিল্ডের জন্য
})
export class School {
  _id: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
    index: true, // দ্রুত সার্চের জন্য
  })
  name: string; // স্কুলের নাম

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  address: string; // স্কুলের ঠিকানা

  @Prop({
    required: true,
    type: String,
    match: /^\+?[\d\s-]{10,}$/, // ফোন নম্বর ফরম্যাট ভ্যালিডেশন
    index: true,
  })
  phoneNumber: string; // ফোন নম্বর

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
  })
  courses: string[]; // স্কুলের কোর্সের তালিকা

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  principal: string; // প্রধান শিক্ষকের নাম

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  website: string | null; // স্কুলের ওয়েবসাইট

  @Prop({
    type: Boolean,
    default: false, // ডিফল্ট false
  })
  isActive: boolean; // স্কুলটি অ্যাক্টিভ কিনা

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
  })
  staff: string[]; // স্কুলের শিক্ষক/স্টাফদের তালিকা

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  logoUrl: string | null; // স্কুলের লোগোর URL

  @Prop({
    type: Number,
    default: 0, // ডিফল্ট 0
    min: 0, // নেগেটিভ হবে না
  })
  studentCount: number; // ছাত্রের সংখ্যা

  @Prop({
    type: Number,
    default: 0, // ডিফল্ট 0
    min: 0, // নেগেটিভ হবে না
  })
  teacherCount: number; // শিক্ষকের সংখ্যা

  @Prop({
    required: true,
    type: Number,
    min: 1800, // ১৮০০ এর আগে স্কুল প্রতিষ্ঠিত হওয়া সম্ভব নয়
    max: new Date().getFullYear(), // বর্তমান বছরের বেশি হবে না
  })
  establishedYear: number; // প্রতিষ্ঠিত বছরের তথ্য

  @Prop({
    required: true,
    type: String,
    trim: true,
    enum: ['Primary', 'Secondary', 'Higher Secondary', 'International'], // স্কুলের প্রকার
  })
  schoolType: string; // স্কুলের প্রকার

  @Prop({
    required: true,
    type: String,
    trim: true,
    index: true, // দ্রুত সার্চের জন্য
  })
  region: string; // স্কুলের অবস্থান

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
  })
  extracurricularActivities: string[]; // স্কুলের বহির্ভূত কর্মকাণ্ডের তালিকা

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
  })
  affiliations: string[]; // স্কুলের যে কোনো সংগঠনের সাথে সম্পর্ক

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  accreditationStatus: string | null; // স্কুলের এক্রেডিটেশন স্ট্যাটাস

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  country: string; // দেশের নাম

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  city: string; // শহরের নাম

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  postalCode: string; // পোস্টাল কোড

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
  socialMediaLinks: Record<string, string> | null;

  @Prop({
    type: Date,
    default: null, // ডিফল্ট null
    validate: {
      validator: (v: Date) => !isNaN(v.getTime()),
      message: 'Invalid lastInspectionDate',
    },
  })
  lastInspectionDate: Date | null; // সর্বশেষ পরিদর্শনের তারিখ

  @Prop({
    required: true,
    type: Number,
    min: 0, // নেগেটিভ হবে না
  })
  totalCampusArea: number; // ক্যাম্পাসের মোট আয়তন (বর্গফুট/বর্গমিটার)

  @Prop({
    required: true,
    type: Number,
    min: 1, // কমপক্ষে একটি ভবন থাকতে হবে
  })
  numberOfBuildings: number; // স্কুলের ভবনের সংখ্যা

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
  })
  languagesOffered: string[]; // স্কুলে পড়ানো ভাষাগুলোর তালিকা

  @Prop({
    required: true,
    type: Number,
    min: 1, // অনুপাত শূন্য বা নেগেটিভ হবে না
  })
  studentTeacherRatio: number; // ছাত্র-শিক্ষক অনুপাত

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট undefined
    trim: true,
  })
  schoolLogo: string | null; // স্কুলের লোগো ফাইলের পাথ

  @Prop({
    type: Boolean,
    default: false, // ডিফল্ট false
  })
  isOnlineLearningAvailable: boolean; // অনলাইন লার্নিং সুবিধা রয়েছে কিনা

  @Prop({
    required: true,
    type: Number,
    min: 1, // কমপক্ষে একটি শ্রেণিকক্ষ থাকতে হবে
  })
  numberOfClassrooms: number; // শ্রেণিকক্ষের সংখ্যা

  @Prop({
    type: [String],
    default: [], // ডিফল্ট খালি অ্যারে
  })
  schoolEvents: string[]; // স্কুলের ইভেন্টস
}

export const SchoolSchema = SchemaFactory.createForClass(School);
