import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

@ObjectType()
export class Parent {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  schoolId: string;

  @Field(() => String)
  relationshipToStudent: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  occupation: string;

  @Field(() => [String])
  emergencyContacts: string[];

  @Field(() => String)
  profilePictureUrl: string;

  @Field(() => [String])
  associatedStudents: string[];

  @Field(() => Boolean)
  isPrimaryGuardian: boolean;

  @Field(() => String)
  notes: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;
}

@InputType()
export class CreateParentInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'School ID is required' })
  schoolId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Relationship to student is required' })
  relationshipToStudent: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Occupation is required' })
  occupation: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Emergency contacts are required' })
  emergencyContacts: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Profile picture URL is required' })
  profilePictureUrl: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Associated students are required' })
  associatedStudents: string[];

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'Is primary guardian is required' })
  isPrimaryGuardian: boolean;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Notes are required' })
  notes: string;
}

@InputType()
export class UpdateParentInput {
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
  @IsNotEmpty({ message: 'Relationship to student is required' })
  relationshipToStudent: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Occupation is required' })
  occupation: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Emergency contacts are required' })
  emergencyContacts: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Profile picture URL is required' })
  profilePictureUrl: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Associated students are required' })
  associatedStudents: string[];

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'Is primary guardian is required' })
  isPrimaryGuardian: boolean;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Notes are required' })
  notes: string;
}

@InputType()
export class GetAllParentsInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'School ID is required' })
  schoolId: string;

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
export class GetAllParentsOutput {
  @Field(() => [Parent])
  parents: Parent[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class DeleteParentOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}

@InputType()
export class CreateManyParentsInput {
  @Field(() => [CreateParentInput])
  @IsArray()
  @IsNotEmpty({ message: 'Parents are required' })
  parents: CreateParentInput[];
}

@ObjectType()
export class CreateManyParentsOutput {
  @Field(() => [Parent])
  parents: Parent[];
}

@InputType()
export class DeleteManyParentsInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Parent IDs are required' })
  ids: string[];
}

@ObjectType()
export class DeleteManyParentsOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
