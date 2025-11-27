import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';  
import { Character } from '../characters/entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Character])],
  controllers: [LocationsController],
  providers: [LocationsService],
  
})
export class LocationsModule {}
