import { Inject, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { Location } from '../locations/entities/location.entity';


@Injectable()
export class CharactersService {

  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto) {
    const character = this.characterRepository.create(createCharacterDto);
    await this.characterRepository.save(character);
    return character;
  }

  async addFavoriteLocation(id: number, locationId: number) {
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: ['favoriteLocations'],
  });

    if (!character) {
      throw new Error('Personaje no encontrado');
    }
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });
    if (!location) {
      throw new Error('Locacion no encontrada');
    }
    character.favPlaces = character.favPlaces || [];
    await this.characterRepository.save(character);
    return character;
  }


  async calculateTaxes(id: number) {
    const character = await this.characterRepository.findOne({
      where: { id },
    });
    if (!character){
      throw new Error('Personaje no encontrado');
    }
    // COEF = SI ES EMPLEADO 0.08 SI NO 0.03
    const mult = character.employee ? 0.08 : 0.03;
    const taxes = character.salary*mult;
    return {taxes};
  }

  // GET /character/:id/taxes GET IMPUESTOS DEL PERSONAJE 
  
  findOne(id: number) {
    return `This action returns a #${id} character`;
  }




}


