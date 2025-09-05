import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sku!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsPositive()
  weight!: number;

  @ApiProperty()
  @IsUrl()
  imageUrl!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  categoryFoodId!: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unitMeasurementId!: number;
}
