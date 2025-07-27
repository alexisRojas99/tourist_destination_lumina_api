import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
    type: Number,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message(s)',
    oneOf: [
      { type: 'string', example: 'Destination with ID 1 not found' },
      {
        type: 'array',
        items: { type: 'string' },
        example: [
          'name should not be empty',
          'description must be longer than or equal to 10 characters',
        ],
      },
    ],
  })
  message: string | string[];

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
    type: String,
  })
  error: string;
}
