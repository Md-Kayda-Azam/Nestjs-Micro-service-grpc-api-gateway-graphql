import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

@ObjectType()
export class Student {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  schoolId: string;

  @Field(() => String)
  dateOfBirth: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  studentID: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  admissionDate: string;

  @Field(() => String)
  enrollmentDate: string;

  @Field(() => String)
  classID: string;

  @Field(() => [String])
  enrolledCourses: string[];

  @Field(() => Object, { nullable: true })
  grades: { [key: string]: number };

  @Field(() => [String])
  extracurricularActivities: string[];

  @Field(() => String)
  parentID: string;

  @Field(() => String)
  nationality: string;

  @Field(() => String)
  graduationDate: string;

  @Field(() => String)
  profilePictureUrl: string;

  @Field(() => [String])
  awards: string[];

  @Field(() => String)
  healthDetails: string;

  @Field(() => Boolean)
  isSpecialNeeds: boolean;

  @Field(() => String)
  remarks: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;
}

@InputType()
export class CreateStudentInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'School ID is required' })
  schoolId: string;

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
  @IsNotEmpty({ message: 'Student ID is required' })
  studentID: string;

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
  @IsNotEmpty({ message: 'Admission date is required' })
  admissionDate: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Enrollment date is required' })
  enrollmentDate: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Class ID is required' })
  classID: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Enrolled courses are required' })
  enrolledCourses: string[];

  @Field(() => Object, { nullable: true })
  @IsOptional()
  grades: { [key: string]: number };

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Extracurricular activities are required' })
  extracurricularActivities: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Parent ID is required' })
  parentID: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Nationality is required' })
  nationality: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Graduation date is required' })
  graduationDate: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Profile picture URL is required' })
  profilePictureUrl: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Awards are required' })
  awards: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Health details are required' })
  healthDetails: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'Is special needs is required' })
  isSpecialNeeds: boolean;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Remarks are required' })
  remarks: string;
}

@InputType()
export class UpdateStudentInput {
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
  @IsNotEmpty({ message: 'Date of birth is required' })
  dateOfBirth: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Gender is required' })
  gender: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Student ID is required' })
  studentID: string;

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
  @IsNotEmpty({ message: 'Admission date is required' })
  admissionDate: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Enrollment date is required' })
  enrollmentDate: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Class ID is required' })
  classID: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Enrolled courses are required' })
  enrolledCourses: string[];

  @Field(() => Object, { nullable: true })
  @IsOptional()
  grades: { [key: string]: number };

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Extracurricular activities are required' })
  extracurricularActivities: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Parent ID is required' })
  parentID: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Nationality is required' })
  nationality: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Graduation date is required' })
  graduationDate: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Profile picture URL is required' })
  profilePictureUrl: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Awards are required' })
  awards: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Health details are required' })
  healthDetails: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'Is special needs is required' })
  isSpecialNeeds: boolean;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Remarks are required' })
  remarks: string;
}

@InputType()
export class GetAllStudentsInput {
  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'IsActive is required' })
  isActive: boolean;

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
export class GetAllStudentsOutput {
  @Field(() => [Student])
  students: Student[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class DeleteStudentOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}

@InputType()
export class CreateManyStudentsInput {
  @Field(() => [CreateStudentInput])
  @IsArray()
  @IsNotEmpty({ message: 'Students are required' })
  students: CreateStudentInput[];
}

@ObjectType()
export class CreateManyStudentsOutput {
  @Field(() => [Student])
  students: Student[];
}

@InputType()
export class DeleteManyStudentsInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Student IDs are required' })
  ids: string[];
}

@ObjectType()
export class DeleteManyStudentsOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
