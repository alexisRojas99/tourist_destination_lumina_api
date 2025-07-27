import { ApiProperty } from '@nestjs/swagger';

export class DestinationResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the destination',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the destination',
    example: '1800 Hotel y Restaurante',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The physical address of the destination',
    example: 'Cerro verde, Santa Ana, El Salvador',
    type: String,
  })
  address: string;

  @ApiProperty({
    description: 'Detailed description of the destination',
    example:
      'Beautiful hotel located in the mountains with stunning views and excellent service.',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'URL of the destination main image',
    example: 'https://example.com/hotel-image.jpg',
    format: 'uri',
    type: String,
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Number of likes for the destination',
    example: 5,
    minimum: 0,
    type: Number,
  })
  likes: number;

  @ApiProperty({
    description: 'Whether the destination is deleted (soft delete)',
    example: false,
    type: Boolean,
  })
  isDeleted: boolean;

  @ApiProperty({
    description: 'Timestamp when the destination was created',
    example: '2025-07-27T00:00:00.000Z',
    format: 'date-time',
    type: String,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the destination was last updated',
    example: '2025-07-27T01:00:00.000Z',
    format: 'date-time',
    type: String,
  })
  updatedAt: Date;
}
