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
  @IsString({
    message: '$property should be string',
  })
  @Length(6, 40, {
    message:
      '$property should have length between $constraint1 and $constraint2',
  })
  name: string;

  @IsOptional()
  @IsString({
    message: '$property should be string',
  })
  @MaxLength(70, {
    message: '$property can have max length $constraint1',
  })
  description?: string;

  @IsEnum(ProjectStatus, {
    message: '$property should have correct status',
  })
  status: ProjectStatus;

  @IsDateString(
    {},
    {
      message: '$property should be date',
    },
  )
  startDate: Date;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: '$property should be date',
    },
  )
  deadline?: Date;
}
