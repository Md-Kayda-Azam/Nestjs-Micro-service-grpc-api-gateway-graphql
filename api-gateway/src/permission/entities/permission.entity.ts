import { Field, ObjectType, InputType, Int, ID } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

@ObjectType()
export class Permission {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}

@InputType()
export class CreatePermissionInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  isActive: boolean;
}

@InputType()
export class UpdatePermissionInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}

@InputType()
export class GetAllPermissionsInput {
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field(() => Int, { defaultValue: 10 })
  limit?: number;

  @Field(() => Int, { defaultValue: 0 })
  offset?: number;
}

@ObjectType()
export class GetAllPermissionsResponse {
  @Field(() => [Permission])
  permissions: Permission[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class DeletePermissionResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}

@InputType()
export class CreateManyPermissionsInput {
  @Field(() => [CreatePermissionInput])
  permissions: CreatePermissionInput[];
}

@ObjectType()
export class CreateManyPermissionsResponse {
  @Field(() => [Permission])
  permissions: Permission[];
}

@InputType()
export class DeleteManyPermissionsInput {
  @Field(() => [String])
  ids: string[];
}

@ObjectType()
export class DeleteManyPermissionsResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
