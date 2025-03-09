import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

// SocialMediaLink কাস্টম টাইপ
@ObjectType()
@InputType('SocialMediaLinkInput')
export class SocialMediaLink {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Platform is required' })
  platform: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'URL is required' })
  url: string;
}

@ObjectType()
export class School {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => [String])
  courses: string[];

  @Field(() => String)
  principal: string;

  @Field(() => String)
  website: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => [String])
  staff: string[];

  @Field(() => String)
  logoUrl: string;

  @Field(() => Int)
  studentCount: number;

  @Field(() => Int)
  teacherCount: number;

  @Field(() => Int)
  establishedYear: number;

  @Field(() => String)
  schoolType: string;

  @Field(() => String)
  region: string;

  @Field(() => [String])
  extracurricularActivities: string[];

  @Field(() => [String])
  affiliations: string[];

  @Field(() => String)
  accreditationStatus: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  postalCode: string;

  @Field(() => [SocialMediaLink], { nullable: true })
  socialMediaLinks: SocialMediaLink[];

  @Field(() => String)
  lastInspectionDate: string;

  @Field(() => Int)
  totalCampusArea: number;

  @Field(() => Int)
  numberOfBuildings: number;

  @Field(() => [String])
  languagesOffered: string[];

  @Field(() => Int)
  studentTeacherRatio: number;

  @Field(() => String)
  schoolLogo: string;

  @Field(() => Boolean)
  isOnlineLearningAvailable: boolean;

  @Field(() => Int)
  numberOfClassrooms: number;

  @Field(() => [String])
  schoolEvents: string[];

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;
}

@InputType()
export class CreateSchoolInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Courses are required' })
  courses: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Principal is required' })
  principal: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Website is required' })
  website: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'IsActive is required' })
  isActive: boolean;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Staff is required' })
  staff: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Logo URL is required' })
  logoUrl: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Student count is required' })
  studentCount: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Teacher count is required' })
  teacherCount: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Established year is required' })
  establishedYear: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'School type is required' })
  schoolType: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Region is required' })
  region: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Extracurricular activities are required' })
  extracurricularActivities: string[];

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Affiliations are required' })
  affiliations: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Accreditation status is required' })
  accreditationStatus: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Postal code is required' })
  postalCode: string;

  @Field(() => [SocialMediaLink], { nullable: true })
  @IsOptional()
  @IsArray()
  socialMediaLinks: SocialMediaLink[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Last inspection date is required' })
  lastInspectionDate: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Total campus area is required' })
  totalCampusArea: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Number of buildings is required' })
  numberOfBuildings: number;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Languages offered are required' })
  languagesOffered: string[];

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Student-teacher ratio is required' })
  studentTeacherRatio: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'School logo is required' })
  schoolLogo: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'Is online learning available is required' })
  isOnlineLearningAvailable: boolean;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Number of classrooms is required' })
  numberOfClassrooms: number;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'School events are required' })
  schoolEvents: string[];
}

@InputType()
export class UpdateSchoolInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Id is required' })
  id: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Courses are required' })
  courses: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Principal is required' })
  principal: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Website is required' })
  website: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'IsActive is required' })
  isActive: boolean;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Staff is required' })
  staff: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Logo URL is required' })
  logoUrl: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Student count is required' })
  studentCount: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Teacher count is required' })
  teacherCount: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Established year is required' })
  establishedYear: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'School type is required' })
  schoolType: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Region is required' })
  region: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Extracurricular activities are required' })
  extracurricularActivities: string[];

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Affiliations are required' })
  affiliations: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Accreditation status is required' })
  accreditationStatus: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Postal code is required' })
  postalCode: string;

  @Field(() => [SocialMediaLink], { nullable: true })
  @IsOptional()
  @IsArray()
  socialMediaLinks: SocialMediaLink[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Last inspection date is required' })
  lastInspectionDate: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Total campus area is required' })
  totalCampusArea: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Number of buildings is required' })
  numberOfBuildings: number;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Languages offered are required' })
  languagesOffered: string[];

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Student-teacher ratio is required' })
  studentTeacherRatio: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'School logo is required' })
  schoolLogo: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'Is online learning available is required' })
  isOnlineLearningAvailable: boolean;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Number of classrooms is required' })
  numberOfClassrooms: number;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'School events are required' })
  schoolEvents: string[];
}

@InputType()
export class GetAllSchoolsInput {
  @Field(() => Boolean, { nullable: true }) // GraphQL-এ অপশনাল
  @IsBoolean() // Boolean হতে হবে
  @IsOptional() // ভ্যালিডেশনে অপশনাল
  isActive?: boolean; // TypeScript-এ অপশনাল

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Limit is required' })
  limit: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Offset is required' })
  offset: number;
}

@ObjectType()
export class GetAllSchoolsOutput {
  @Field(() => [School])
  schools: School[];

  @Field(() => Int)
  total: number;

  @Field(() => String, { nullable: true }) // নতুন ফিল্ড
  message?: string;
}

@ObjectType()
export class DeleteSchoolOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}

@InputType()
export class CreateManySchoolsInput {
  @Field(() => [CreateSchoolInput])
  @IsArray()
  @IsNotEmpty({ message: 'Schools are required' })
  schools: CreateSchoolInput[];
}

@ObjectType()
export class CreateManySchoolsOutput {
  @Field(() => [School])
  schools: School[];
}

@InputType()
export class DeleteManySchoolsInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'School IDs are required' })
  ids: string[];
}

@ObjectType()
export class DeleteManySchoolsOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
