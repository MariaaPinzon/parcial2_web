import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}
  
  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);
    if (createLocationDto.owner) {
      const existingLocation = await this.locationRepository.findOne({
        where: { owner: createLocationDto.owner },
      });
      if (existingLocation) {
        throw new Error('El dueño ya posee otra locacion');
      }
    }
    await this.locationRepository.save(location);
    return location;
    
  }

  // GET /location
  async findAll(){
    return this.locationRepository.find();
  }

}
