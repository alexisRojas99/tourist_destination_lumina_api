import {
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
  IsBoolean,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDestinationDto {
  @ApiProperty({
    description: 'The name of the destination',
    example: '1800 Hotel y Restaurante',
    maxLength: 250,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  name: string;

  @ApiProperty({
    description: 'The address of the destination',
    example: 'Cerro verde',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'A detailed description of the destination',
    example: 'Lorem Ipsum is simply dummy text',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'URL of the destination image',
    example:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/36/ec/5d/casa-1800-cerro-verde.jpg?w=900&h=500&s=1',
  })
  @IsString()
  @IsUrl()
  imageUrl: string;

  @ApiProperty({
    description: 'Number of likes for the destination',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  likes?: number;

  @ApiProperty({
    description: 'Whether the destination is deleted',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
