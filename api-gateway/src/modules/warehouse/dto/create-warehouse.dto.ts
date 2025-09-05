import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
  IsNotEmptyObject,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


@ValidatorConstraint({ name: 'LatLonOrAddress', async: false })
export class LatLonOrAddressConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const obj = args.object as any;

    const hasLatLon = obj.lat !== undefined && obj.lon !== undefined;
    const hasAddress = obj.address !== undefined && obj.address !== '';

    // válido si tiene lat+lon juntos, o si tiene address
    return hasLatLon || hasAddress;
  }

  defaultMessage(_: ValidationArguments) {
    return 'Either address OR both lat and lon must be provided';
  }
}

class LocationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lon?: number;

  @Validate(LatLonOrAddressConstraint)
  _check!: string;
}

export class CreateWarehouseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name!: string;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => LocationDto)
  location!: LocationDto;

  @ApiProperty()
  @IsOptional()
  @IsString()
  manager?: string;
}


