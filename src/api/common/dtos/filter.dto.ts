import { IsOptional, IsPositive, Min } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  @Min(1)
  page: number;
}
