import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

@InputType()
export class verifyAccountInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Verify token is required' })
  token: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}

@InputType()
export class resendVerificationInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

@InputType()
export class loginInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  password: string;
}
