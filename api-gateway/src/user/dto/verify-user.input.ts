import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';

@InputType()
export class VerifyUserInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  token: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must contain at least one letter and one number',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
