import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  IsEmail,
  Matches,
  IsNotEmpty,
} from 'class-validator';

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
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  role: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'School is required' })
  school: string;
}
