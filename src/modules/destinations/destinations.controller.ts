import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@ApiTags('Destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new destination' })
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationsService.create(createDestinationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all destinations' })
  findAll() {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a destination by id' })
  @ApiParam({ name: 'id', description: 'Destination ID', type: 'number' })
  findOne(@Param('id') id: string) {
    return this.destinationsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a destination' })
  @ApiParam({ name: 'id', description: 'Destination ID', type: 'number' })
  update(
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationsService.update(+id, updateDestinationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a destination (soft delete)' })
  @ApiParam({ name: 'id', description: 'Destination ID', type: 'number' })
  remove(@Param('id') id: string) {
    return this.destinationsService.remove(+id);
  }
}
