import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

@ObjectType()
export class Permission {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;
}

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}

@InputType()
export class UpdatePermissionInput {
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
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty({ message: 'IsActive is required' })
  isActive: boolean;
}

@InputType()
export class GetAllPermissionsInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Limit is required' })
  limit: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty({ message: 'Limit is required' })
  offset: number;
}

@ObjectType()
export class GetAllPermissionsOutput {
  @Field(() => [Permission])
  permissions: Permission[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class DeletePermissionOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}

@InputType()
export class CreateManyPermissionsInput {
  @Field(() => [CreatePermissionInput])
  @IsArray()
  @IsNotEmpty({ message: 'Permissions is required' })
  permissions: CreatePermissionInput[];
}

@ObjectType()
export class CreateManyPermissionsOutput {
  @Field(() => [Permission])
  permissions: Permission[];
}

@InputType()
export class DeleteManyPermissionsInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Permissions ids is required' })
  ids: string[];
}

@ObjectType()
export class DeleteManyPermissionsOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}

@ObjectType()
export class GetManyPermissionsResponse {
  @Field(() => [Permission])
  permissions: Permission[];

  @Field(() => Int)
  total: number;
}
