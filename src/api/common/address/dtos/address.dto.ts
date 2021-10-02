import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createAddressDto {
  @IsNotEmpty({ message: 'The Address name must not be empty' })
  address: string;

  @IsNotEmpty({ message: 'The Address zip_code must not be empty' })
  zip_code: string;

  @IsString({ message: 'The Address city must be string' })
  city: string;

  @IsString({ message: 'The Address state must be string' })
  state: string;

  @IsString({ message: 'The Address country must be string' })
  country: string;

  @IsOptional()
  @IsPositive()
  readonly companyId: number;

  @IsOptional()
  @IsPositive()
  readonly userId: number;
}

export class updateAddressDto extends PartialType(createAddressDto) {}
