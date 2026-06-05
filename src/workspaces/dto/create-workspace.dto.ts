import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({
    example: 'EPAM team"s workspace',
    description: 'Workspace name',
  })
  @IsString({
    message: '$property should be string',
  })
  @Length(2, 30, {
    message: '$property length should be between $constraint1 and $constraint2',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Workspace only for EPUM members',
    description: 'Workspace description',
  })
  @IsOptional()
  @IsString({
    message: '$property should be string',
  })
  @MaxLength(50, {
    message: '$property can have max $constraint1 symbols',
  })
  description?: string;
}
