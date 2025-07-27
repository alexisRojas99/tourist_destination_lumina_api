import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseDto {
  @ApiProperty({
    description: 'Success message confirming the deletion',
    example: 'Destination deleted successfully',
    type: String,
  })
  message: string;
}
