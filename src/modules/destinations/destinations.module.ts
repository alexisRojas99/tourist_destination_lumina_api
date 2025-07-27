import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DestinationsService } from './destinations.service';
import { DestinationsController } from './destinations.controller';
import { Destination } from './entities/destination.entity';

@Module({
  imports: [SequelizeModule.forFeature([Destination])],
  controllers: [DestinationsController],
  providers: [DestinationsService],
  exports: [DestinationsService],
})
export class DestinationsModule {}
