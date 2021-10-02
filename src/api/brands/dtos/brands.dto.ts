import { IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createBrandDto {
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @IsNotEmpty({ message: 'description must not be empty' })
  description: string;

  @IsUrl({}, { message: 'image must be URL' })
  image: string;
}

export class UpdateBrandDto extends PartialType(createBrandDto) {}
