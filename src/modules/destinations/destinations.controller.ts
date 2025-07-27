import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { DestinationResponseDto } from './dto/destination-response.dto';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { ErrorResponseDto } from './dto/error-response.dto';

@ApiTags('Destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new destination',
    description:
      'Creates a new tourist destination with the provided information',
  })
  @ApiResponse({
    status: 201,
    description: 'Destination created successfully',
    type: DestinationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
    type: ErrorResponseDto,
  })
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationsService.create(createDestinationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all destinations',
    description: 'Retrieves a list of all active destinations (not deleted)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of destinations retrieved successfully',
    type: [DestinationResponseDto],
  })
  findAll() {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a destination by id',
    description: 'Retrieves a specific destination by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the destination',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Destination found and retrieved successfully',
    type: DestinationResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Destination not found',
    type: ErrorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.destinationsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a destination',
    description: 'Updates an existing destination with new information',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the destination to update',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Destination updated successfully',
    type: DestinationResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Destination not found',
    type: ErrorResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationsService.update(+id, updateDestinationDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a destination (soft delete)',
    description:
      'Soft deletes a destination by marking it as deleted without removing it from the database',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the destination to delete',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Destination deleted successfully (soft delete)',
    type: DeleteResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Destination not found',
    type: ErrorResponseDto,
  })
  remove(@Param('id') id: string) {
    return this.destinationsService.remove(+id);
  }
}
