import { IsBoolean, IsOptional, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createUserModuleDto {
  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean (true, false)' })
  isActive: boolean;

  @IsPositive()
  userId: number;

  @IsPositive()
  moduleId: number;
}

export class updateUserModuleDto extends PartialType(createUserModuleDto) {}
