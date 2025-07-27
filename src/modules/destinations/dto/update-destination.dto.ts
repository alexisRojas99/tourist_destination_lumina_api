import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDestinationDto } from './create-destination.dto';

export class UpdateDestinationDto extends PartialType(CreateDestinationDto) {
  @ApiPropertyOptional({
    description: 'The updated name of the destination',
    example: 'Updated Hotel Name',
    maxLength: 250,
    minLength: 2,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(250)
  name?: string;

  @ApiPropertyOptional({
    description: 'The updated physical address of the destination',
    example: 'New Address, Updated City, El Salvador',
    type: String,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Updated detailed description of the destination',
    example:
      'Updated description with new information about the destination and its amenities.',
    minLength: 10,
    maxLength: 1000,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated URL of the destination main image',
    example: 'https://example.com/new-destination-image.jpg',
    format: 'uri',
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'imageUrl must be a valid URL' })
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Updated number of likes for the destination',
    example: 15,
    minimum: 0,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'likes must be a number' })
  likes?: number;

  @ApiPropertyOptional({
    description: 'Updated soft delete status of the destination',
    example: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
