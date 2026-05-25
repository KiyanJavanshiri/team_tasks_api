import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Alex',
    description: "user's name",
    minLength: 1,
    maxLength: 40,
  })
  @Length(1, 40, {
    message: '$property should be between $constraint1 and $constraint2',
  })
  @IsString({
    message: '$property should be string',
  })
  name: string;

  @ApiProperty({
    example: 'Alex@gmail.com',
    description: "user's email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'alex80232_892',
    description: "user's password",
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: '$property must be strong',
  })
  @IsString({
    message: '$property should be string',
  })
  password: string;

  @ApiProperty({
    example: 'unsplash.com.photo1',
    description: "user's avatar profile",
  })
  @IsString({
    message: '$property should be string',
  })
  @IsOptional()
  avatar?: string;
}
