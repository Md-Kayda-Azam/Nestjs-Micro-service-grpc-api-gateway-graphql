import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  role: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'School is required' })
  school: string;
}
