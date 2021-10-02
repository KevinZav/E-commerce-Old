import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsISO8601,
  Matches,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createCompanyDto {
  @IsNotEmpty({ message: "The Company's name must not be empty" })
  name: string;

  @IsNotEmpty({ message: "The Company's title must not be empty" })
  title: string;

  @IsUrl({}, { message: "The Company's logo must not be empty" })
  logo: string;

  @IsNotEmpty({ message: "The Company's RFC must not be empty" })
  RFC: string;

  @IsString()
  commercial_line: string;

  @IsDateString()
  @Matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'Date format failed(yyyy-mm-dd)',
  })
  date_registration: string;

  @IsArray()
  @IsOptional()
  readonly modulesIds: number[];
}

export class updateCompanyDto extends PartialType(createCompanyDto) {}
