import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createUserTypeDto {
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @IsNotEmpty({ message: 'description must not be empty' })
  description: string;

  @IsOptional()
  @IsString()
  icon: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  readonly companyId: number;
}

export class updateUserTypeDto extends PartialType(createUserTypeDto) {}
