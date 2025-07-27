import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { Destination } from './entities/destination.entity';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

describe('DestinationsService', () => {
  let service: DestinationsService;
  let destinationModel: any;

  const mockDestination = {
    id: 1,
    name: '1800 Hotel y Restaurante',
    address: 'Cerro verde',
    description: 'Lorem ipsum...',
    imageUrl: 'https://example.com/image.jpg',
    likes: 0,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockDestinationModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DestinationsService,
        {
          provide: getModelToken(Destination),
          useValue: mockDestinationModel,
        },
      ],
    }).compile();

    service = module.get<DestinationsService>(DestinationsService);
    destinationModel = module.get(getModelToken(Destination));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new destination successfully', async () => {
      const createDestinationDto: CreateDestinationDto = {
        name: '1800 Hotel y Restaurante',
        address: 'Cerro verde',
        description: 'Lorem ipsum...',
        imageUrl: 'https://example.com/image.jpg',
      };

      mockDestinationModel.create.mockResolvedValue(mockDestination);

      const result = await service.create(createDestinationDto);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(destinationModel.create).toHaveBeenCalledWith({
        ...createDestinationDto,
        likes: 0,
        isDeleted: false,
      });
      expect(result).toEqual(mockDestination);
    });

    it('should create a destination with custom likes and isDeleted values', async () => {
      const createDestinationDto: CreateDestinationDto = {
        name: 'Test Hotel',
        address: 'Test Address',
        description: 'Test Description',
        imageUrl: 'https://example.com/test.jpg',
        likes: 5,
        isDeleted: true,
      };

      const customMockDestination = {
        ...mockDestination,
        likes: 5,
        isDeleted: true,
      };
      mockDestinationModel.create.mockResolvedValue(customMockDestination);

      const result = await service.create(createDestinationDto);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(destinationModel.create).toHaveBeenCalledWith({
        ...createDestinationDto,
        likes: 5,
        isDeleted: true,
      });
      expect(result).toEqual(customMockDestination);
    });
  });

  describe('findAll', () => {
    it('should return an array of non-deleted destinations', async () => {
      const mockDestinations = [mockDestination, { ...mockDestination, id: 2 }];
      mockDestinationModel.findAll.mockResolvedValue(mockDestinations);

      const result = await service.findAll();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(destinationModel.findAll).toHaveBeenCalledWith({
        where: { isDeleted: false },
      });
      expect(result).toEqual(mockDestinations);
    });

    it('should return an empty array if no destinations found', async () => {
      mockDestinationModel.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a destination if found', async () => {
      mockDestinationModel.findByPk.mockResolvedValue(mockDestination);

      const result = await service.findOne(1);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(destinationModel.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDestination);
    });

    it('should throw NotFoundException if destination not found', async () => {
      mockDestinationModel.findByPk.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('Destination with ID 999 not found'),
      );
    });
  });

  describe('update', () => {
    it('should update and return the destination', async () => {
      const updateDestinationDto: UpdateDestinationDto = {
        name: 'Updated Hotel Name',
      };

      mockDestinationModel.findByPk.mockResolvedValue(mockDestination);
      mockDestination.update.mockResolvedValue(mockDestination);

      const result = await service.update(1, updateDestinationDto);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(destinationModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockDestination.update).toHaveBeenCalledWith(updateDestinationDto);
      expect(result).toEqual(mockDestination);
    });

    it('should throw NotFoundException if destination not found during update', async () => {
      const updateDestinationDto: UpdateDestinationDto = {
        name: 'Updated Hotel Name',
      };

      mockDestinationModel.findByPk.mockResolvedValue(null);

      await expect(service.update(999, updateDestinationDto)).rejects.toThrow(
        new NotFoundException('Destination with ID 999 not found'),
      );
    });
  });

  describe('remove', () => {
    it('should soft delete a destination', async () => {
      mockDestinationModel.findByPk.mockResolvedValue(mockDestination);
      mockDestination.update.mockResolvedValue(mockDestination);

      await service.remove(1);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(destinationModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockDestination.update).toHaveBeenCalledWith({ isDeleted: true });
    });

    it('should throw NotFoundException if destination not found during removal', async () => {
      mockDestinationModel.findByPk.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(
        new NotFoundException('Destination with ID 999 not found'),
      );
    });
  });
});
