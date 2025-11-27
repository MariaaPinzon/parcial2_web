import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  // PATCH /character/:id/favorites/:locationId
  @Patch(':id/favorites/:locationId')
  addFavoriteLocation(
    @Param('id') id:number,
    @Param('locationId') locationId:number
  ){
    return this.charactersService.addFavoriteLocation(id,locationId)
  }
  

  
}
