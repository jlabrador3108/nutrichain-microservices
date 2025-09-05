import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class MovementDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productSku: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  warehouseId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note?: string;
}
