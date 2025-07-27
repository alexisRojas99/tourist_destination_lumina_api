/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

describe('DestinationsController', () => {
  let controller: DestinationsController;
  let service: DestinationsService;

  const mockDestination = {
    id: 1,
    name: '1800 Hotel y Restaurante',
    address: 'Cerro verde',
    description: 'Lorem ipsum dolor sit amet...',
    imageUrl: 'https://example.com/image.jpg',
    likes: 0,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDestinationsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinationsController],
      providers: [
        {
          provide: DestinationsService,
          useValue: mockDestinationsService,
        },
      ],
    }).compile();

    controller = module.get<DestinationsController>(DestinationsController);
    service = module.get<DestinationsService>(DestinationsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new destination', async () => {
      const createDestinationDto: CreateDestinationDto = {
        name: '1800 Hotel y Restaurante',
        address: 'Cerro verde',
        description: 'Lorem ipsum dolor sit amet...',
        imageUrl: 'https://example.com/image.jpg',
      };

      mockDestinationsService.create.mockResolvedValue(mockDestination);

      const result = await controller.create(createDestinationDto);

      expect(service.create).toHaveBeenCalledWith(createDestinationDto);
      expect(result).toEqual(mockDestination);
    });
  });

  describe('findAll', () => {
    it('should return an array of destinations', async () => {
      const mockDestinations = [
        mockDestination,
        { ...mockDestination, id: 2, name: 'Another Hotel' },
      ];

      mockDestinationsService.findAll.mockResolvedValue(mockDestinations);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockDestinations);
    });

    it('should return an empty array when no destinations exist', async () => {
      mockDestinationsService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a destination by id', async () => {
      mockDestinationsService.findOne.mockResolvedValue(mockDestination);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockDestination);
    });

    it('should handle NotFoundException from service', async () => {
      mockDestinationsService.findOne.mockRejectedValue(
        new NotFoundException('Destination with ID 999 not found'),
      );

      await expect(controller.findOne('999')).rejects.toThrow(
        new NotFoundException('Destination with ID 999 not found'),
      );
    });
  });

  describe('update', () => {
    it('should update a destination', async () => {
      const updateDestinationDto: UpdateDestinationDto = {
        name: 'Updated Hotel Name',
        likes: 10,
      };

      const updatedDestination = {
        ...mockDestination,
        name: 'Updated Hotel Name',
        likes: 10,
      };

      mockDestinationsService.update.mockResolvedValue(updatedDestination);

      const result = await controller.update('1', updateDestinationDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDestinationDto);
      expect(result).toEqual(updatedDestination);
    });

    it('should handle NotFoundException during update', async () => {
      const updateDestinationDto: UpdateDestinationDto = {
        name: 'Updated Hotel Name',
      };

      mockDestinationsService.update.mockRejectedValue(
        new NotFoundException('Destination with ID 999 not found'),
      );

      await expect(
        controller.update('999', updateDestinationDto),
      ).rejects.toThrow(
        new NotFoundException('Destination with ID 999 not found'),
      );
    });
  });

  describe('remove', () => {
    it('should remove a destination', async () => {
      mockDestinationsService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should handle NotFoundException during removal', async () => {
      mockDestinationsService.remove.mockRejectedValue(
        new NotFoundException('Destination with ID 999 not found'),
      );

      await expect(controller.remove('999')).rejects.toThrow(
        new NotFoundException('Destination with ID 999 not found'),
      );
    });
  });
});
