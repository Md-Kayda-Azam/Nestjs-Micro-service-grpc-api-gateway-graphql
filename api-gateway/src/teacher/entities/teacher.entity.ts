import { ObjectType, Field, InputType, Int, Float } from '@nestjs/graphql';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  Matches,
} from 'class-validator';
import {
  SocialMediaLinks,
  SocialMediaLinksInput,
} from './social-media-links.entity';

// ObjectType for Teacher (output)
@ObjectType()
export class Teacher {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  schoolId: string;

  @Field(() => String)
  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field(() => String)
  @IsString()
  @Matches(/^\+?[\d\s-]{10,}$/, { message: 'Invalid phone number format' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  subject: string;

  @Field(() => [String])
  qualifications: string[];

  @Field(() => String)
  hireDate: string;

  @Field(() => String)
  profilePictureUrl: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  dateOfBirth: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  nationality: string;

  @Field(() => SocialMediaLinks, { nullable: true }) // Use SocialMediaLinks for output
  socialMediaLinks: SocialMediaLinks;

  @Field(() => String)
  emergencyContact: string;

  @Field(() => Float)
  salary: number;

  @Field(() => Int)
  teachingExperienceYears: number;

  @Field(() => [String])
  assignedClasses: string[];

  @Field(() => [String])
  assignedSubjects: string[];

  @Field(() => Int)
  studentCount: number;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;
}

// InputType for CreateTeacherInput
@InputType()
export class CreateTeacherInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'School ID is required' })
  schoolId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Subject is required' })
  subject: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Qualifications are required' })
  qualifications: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Hire date is required' })
  hireDate: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Profile picture URL is required' })
  profilePictureUrl: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Date of birth is required' })
  dateOfBirth: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Gender is required' })
  gender: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Nationality is required' })
  nationality: string;

  @Field(() => SocialMediaLinksInput, { nullable: true }) // Use SocialMediaLinksInput for input
  @IsOptional()
  socialMediaLinks: SocialMediaLinksInput;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Emergency contact is required' })
  emergencyContact: string;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty({ message: 'Salary is required' })
  salary: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Teaching experience years is required' })
  teachingExperienceYears: number;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Assigned classes are required' })
  assignedClasses: string[];

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Assigned subjects are required' })
  assignedSubjects: string[];

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Student count is required' })
  studentCount: number;
}

// InputType for UpdateTeacherInput
@InputType()
export class UpdateTeacherInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Id is required' })
  id: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'School ID is required' })
  schoolId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Subject is required' })
  subject: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Qualifications are required' })
  qualifications: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Hire date is required' })
  hireDate: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Profile picture URL is required' })
  profilePictureUrl: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Date of birth is required' })
  dateOfBirth: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Gender is required' })
  gender: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Nationality is required' })
  nationality: string;

  @Field(() => SocialMediaLinksInput, { nullable: true }) // Use SocialMediaLinksInput for input
  @IsOptional()
  socialMediaLinks: SocialMediaLinksInput;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Emergency contact is required' })
  emergencyContact: string;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty({ message: 'Salary is required' })
  salary: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Teaching experience years is required' })
  teachingExperienceYears: number;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Assigned classes are required' })
  assignedClasses: string[];

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Assigned subjects are required' })
  assignedSubjects: string[];

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Student count is required' })
  studentCount: number;
}

// Rest of the file remains the same
@InputType()
export class GetAllTeachersInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

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
export class GetAllTeachersOutput {
  @Field(() => [Teacher])
  teachers: Teacher[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class DeleteTeacherOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}

@InputType()
export class CreateManyTeachersInput {
  @Field(() => [CreateTeacherInput])
  @IsArray()
  @IsNotEmpty({ message: 'Teachers are required' })
  teachers: CreateTeacherInput[];
}

@ObjectType()
export class CreateManyTeachersOutput {
  @Field(() => [Teacher])
  teachers: Teacher[];
}

@InputType()
export class DeleteManyTeachersInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Teacher IDs are required' })
  ids: string[];
}

@ObjectType()
export class DeleteManyTeachersOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
