import {Body,Controller,Get,Param,ParseIntPipe,Patch,Post,UseGuards,} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { ApiTokenGuard } from 'src/guards/api-token.guard';

@UseGuards(ApiTokenGuard) // para las rutas privadas
@Controller('character') 
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Patch(':id/favorites/:locationId')
  addFavoriteLocation(
    @Param('id', ParseIntPipe) id: number,
    @Param('locationId', ParseIntPipe) locationId: number,
  ) {
    return this.charactersService.addFavoriteLocation(id, locationId);
  }

  @Get(':id/taxes')
  getTaxes(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.calculateTaxes(id);
  }
}
