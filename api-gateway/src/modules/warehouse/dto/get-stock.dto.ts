import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetStockDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productSku!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  warehouseId!: string;
}
