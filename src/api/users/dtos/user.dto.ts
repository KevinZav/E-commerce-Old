import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';

export class createUserDto {
  @IsNotEmpty({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Last name must be a string' })
  last_name: string;

  @IsEmail({}, { message: 'Email must be a email valid' })
  email: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Phone must be a phone number valid' })
  phone: string;

  @IsOptional()
  RFC: string;

  @IsOptional()
  @IsUrl({}, { message: 'Image must be a URL' })
  photo: string;
}

export class updateUserDto extends PartialType(createUserDto) {}
