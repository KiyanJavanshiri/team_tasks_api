import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ProjectStatus } from 'src/common/enums/project-status.enum';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Backend API design',
    maxLength: 40,
    minLength: 6,
    description: 'Name of the project',
  })
  @IsString({
    message: '$property should be string',
  })
  @Length(6, 40, {
    message:
      '$property should have length between $constraint1 and $constraint2',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'To design API for backend',
    description: 'Description of the project',
    maxLength: 70,
  })
  @IsOptional()
  @IsString({
    message: '$property should be string',
  })
  @MaxLength(70, {
    message: '$property can have max length $constraint1',
  })
  description?: string;

  @ApiPropertyOptional({
    example: 'active',
    description: 'Status of the project',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(ProjectStatus, {
    message: '$property should have correct status',
  })
  status?: ProjectStatus;

  @ApiProperty({
    example: '01-02-2003',
    description: 'Start date of the project',
  })
  @IsDateString(
    {},
    {
      message: '$property should be date',
    },
  )
  startDate: Date;

  @ApiPropertyOptional({
    example: '31-02-2003',
    description: 'Deadline of the project',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: '$property should be date',
    },
  )
  deadline?: Date;
}
