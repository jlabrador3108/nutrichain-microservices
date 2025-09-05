import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class QueryGetMovementsByProductDto {
  @ApiProperty()
  @IsString()
  productSku!: string;  

  @ApiProperty()
  @IsDateString()
  startDate!: string;

  @ApiProperty()
  @IsDateString()
  endDate!: string;  
}