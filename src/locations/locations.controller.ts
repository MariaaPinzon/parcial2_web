import {Body,Controller,Get,Post,UseGuards} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiTokenGuard } from 'src/guards/api-token.guard';

@UseGuards(ApiTokenGuard) // para las rutas privadas
@Controller('location')  
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  //POST /api/location
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  //GET /api/location
  @Get()
  findAll() {
    return this.locationsService.findAllWithFavVisitors();
  }
}
