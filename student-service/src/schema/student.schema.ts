import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

@Schema({
  timestamps: true,
  collection: 'students', // কালেকশন নাম স্পষ্ট করা
  toJSON: { virtuals: true }, // ভার্চুয়াল ফিল্ড যোগ করার জন্য
})
export class Student {
  _id: string;

  @Prop({
    required: true,
    ref: 'School',
    type: String,
    index: true, // স্কুলের সাথে দ্রুত রেফারেন্সের জন্য
  })
  schoolId: string; // কোন স্কুলের সাথে সম্পর্কিত

  @Prop({
    required: true,
    ref: 'Parent',
    type: String,
    index: true, // স্কুলের সাথে দ্রুত রেফারেন্সের জন্য
  })
  parentId: string; // কোন স্কুলের সাথে সম্পর্কিত

  @Prop({
    required: true,
    type: Date,
    validate: {
      validator: (v: Date) => !isNaN(v.getTime()), // বৈধ তারিখ চেক
      message: 'Invalid dateOfBirth',
    },
  })
  dateOfBirth: Date; // ছাত্রের জন্মতারি�kh

  @Prop({
    required: true,
    type: String,
    enum: ['Male', 'Female', 'Other'], // লিঙ্গের জন্য বৈধ মান
    index: true,
  })
  gender: string; // ছাত্রের লিঙ্গ

  @Prop({
    required: true,
    type: String,
    unique: true, // একই studentID দ্বিতীয়বার ব্যবহার হবে না
    index: true,
  })
  studentID: string; // ছাত্রের আইডি

  @Prop({
    required: true,
    type: String,
    unique: true, // ইউনিক ইমেইল
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // ইমেইল ফরম্যাট ভ্যালিডেশন
    index: true,
  })
  email: string; // ছাত্রের ইমেইল ঠিকানা

  @Prop({
    required: true,
    type: String,
    match: /^\+?[\d\s-]{10,}$/, // ফোন নম্বর ফরম্যাট (যেমন +8801234567890)
    index: true,
  })
  phoneNumber: string; // ছাত্রের ফোন নম্বর

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট মান null
    trim: true, // অতিরিক্ত স্পেস রিমুভ
  })
  address: string; // ছাত্রের ঠিকানা (ঐচ্ছিক)

  @Prop({
    required: true,
    type: Date,
    validate: {
      validator: (v: Date) => !isNaN(v.getTime()),
      message: 'Invalid admissionDate',
    },
  })
  admissionDate: Date; // ছাত্রের ভর্তি হওয়ার তারিখ

  @Prop({
    required: true,
    type: Date,
    validate: {
      validator: (v: Date) => !isNaN(v.getTime()),
      message: 'Invalid enrollmentDate',
    },
  })
  enrollmentDate: Date; // ছাত্রের ভর্তি হওয়ার তারিখ

  @Prop({
    required: true,
    type: String,
    index: true,
  })
  classId: string; // ছাত্রটি কোন ক্লাসে রয়েছে

  @Prop({
    type: [String],
    default: [], // ডিফল্ট মান খালি অ্যারে
  })
  enrolledCourses: string[]; // ছাত্রের যে সব কোর্সে ভর্তি

  @Prop({
    type: Map,
    of: Number,
    default: {}, // ডিফল্ট মান খালি ম্যাপ
  })
  grades: Map<string, number>; // ছাত্রের গ্রেড

  @Prop({
    type: [String],
    default: [], // ডিফল্ট মান খালি অ্যারে
  })
  extracurricularActivities: string[]; // ছাত্রের বহির্ভূত কর্মকাণ্ড

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  nationality: string; // ছাত্রের জাতীয়তা

  @Prop({
    type: Date,
    validate: {
      validator: (v: Date) => !isNaN(v.getTime()),
      message: 'Invalid graduationDate',
    },
    default: null, // ডিফল্ট মান null
  })
  graduationDate: Date; // ছাত্রের গ্র্যাজুয়েশনের তারিখ

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট মান null
    trim: true,
  })
  profilePictureUrl: string; // ছাত্রের প্রোফাইল ছবি

  @Prop({
    type: [String],
    default: [], // ডিফল্ট মান খালি অ্যারে
  })
  awards: string[]; // ছাত্রের অর্জিত পুরস্কারের তালিকা

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট মান null
    trim: true,
  })
  healthDetails: string; // ছাত্রের স্বাস্থ্য সম্পর্কিত বিবরণ

  @Prop({
    type: Boolean,
    default: false, // ডিফল্ট মান false
  })
  isSpecialNeeds: boolean; // বিশেষ চাহিদাসম্পন্ন ছাত্র কিনা

  @Prop({
    type: String,
    default: undefined, // ডিফল্ট মান null
    trim: true,
  })
  remarks: string; // ছাত্রের বিষয়ে যে কোনো মন্তব্য
}

export const StudentSchema = SchemaFactory.createForClass(Student);
