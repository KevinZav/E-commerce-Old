import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createModuleDto {
  @IsNotEmpty({ message: "The Module's path must not be empty" })
  @IsString()
  path: string;

  @IsNotEmpty({ message: "The Module's name must not be empty" })
  name: string;

  @IsNotEmpty({ message: "The Module's description must not be empty" })
  description: string;

  @IsOptional()
  icon: string;
}

export class updateModuleDto extends PartialType(createModuleDto) {}
