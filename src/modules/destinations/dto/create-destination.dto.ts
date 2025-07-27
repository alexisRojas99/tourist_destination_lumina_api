import {
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
  IsBoolean,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDestinationDto {
  @ApiProperty({
    description: 'The name of the destination',
    example: '1800 Hotel y Restaurante',
    maxLength: 250,
    minLength: 2,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(250)
  name: string;

  @ApiProperty({
    description: 'The physical address of the destination',
    example: 'Cerro verde, Santa Ana, El Salvador',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'A detailed description of the destination',
    example:
      'Beautiful hotel located in the mountains with stunning views and excellent service. Perfect for couples and families looking for a peaceful retreat.',
    minLength: 10,
    maxLength: 1000,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    description: 'URL of the destination main image',
    example:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/36/ec/5d/casa-1800-cerro-verde.jpg?w=900&h=500&s=1',
    format: 'uri',
    type: String,
  })
  @IsString()
  @IsUrl({}, { message: 'imageUrl must be a valid URL' })
  imageUrl: string;

  @ApiPropertyOptional({
    description: 'Number of likes for the destination',
    example: 0,
    minimum: 0,
    default: 0,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'likes must be a number' })
  likes?: number;

  @ApiPropertyOptional({
    description: 'Whether the destination is deleted (soft delete)',
    example: false,
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
