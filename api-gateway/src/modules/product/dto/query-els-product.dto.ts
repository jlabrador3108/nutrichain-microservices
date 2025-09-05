import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryElsProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  categoryFoodId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;
}