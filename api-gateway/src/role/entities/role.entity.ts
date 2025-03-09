import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Permission } from 'src/permission/entities/permission.entity';

@ObjectType()
export class Role {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  // @Field(() => [String])
  // permissionIds: string[];

  @Field(() => [Permission])
  permissions: Permission[];

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
export class CreateRoleInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Permission IDs are required' })
  permissionIds: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}

@InputType()
export class UpdateRoleInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Id is required' })
  id: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Permission IDs are required' })
  permissionIds: string[];

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
export class GetAllRolesInput {
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
export class GetAllRolesOutput {
  @Field(() => [Role])
  roles: Role[];

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class DeleteRoleOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}

@InputType()
export class CreateManyRolesInput {
  @Field(() => [CreateRoleInput])
  @IsArray()
  @IsNotEmpty({ message: 'Roles are required' })
  roles: CreateRoleInput[];
}

@ObjectType()
export class CreateManyRolesOutput {
  @Field(() => [Role])
  roles: Role[];
}

@InputType()
export class DeleteManyRolesInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty({ message: 'Role IDs are required' })
  ids: string[];
}

@ObjectType()
export class DeleteManyRolesOutput {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
