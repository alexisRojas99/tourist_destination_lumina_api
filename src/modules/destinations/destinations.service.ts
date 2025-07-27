import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { Destination } from './entities/destination.entity';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination)
    private readonly destinationModel: typeof Destination,
  ) {}

  async create(
    createDestinationDto: CreateDestinationDto,
  ): Promise<Destination> {
    const destination: Destination = await this.destinationModel.create({
      ...createDestinationDto,
      likes: createDestinationDto.likes ?? 0,
      isDeleted: createDestinationDto.isDeleted ?? false,
    });

    return destination;
  }

  async findAll(): Promise<Destination[]> {
    const destinations = await this.destinationModel.findAll({
      where: { isDeleted: false },
    });

    return destinations;
  }

  async findOne(id: number): Promise<Destination> {
    const destination = await (this.destinationModel.findByPk as any)(id);

    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }

    return destination as Destination;
  }

  async update(
    id: number,
    updateDestinationDto: UpdateDestinationDto,
  ): Promise<Destination> {
    const destination = await this.findOne(id);

    await destination.update(updateDestinationDto);

    return destination;
  }

  async remove(id: number): Promise<{ message: string }> {
    const destination = await this.findOne(id);

    await destination.update({ isDeleted: true });

    return { message: 'Destination deleted successfully' };
  }
}
