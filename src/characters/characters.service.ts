import {BadRequestException,Injectable,NotFoundException,} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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

  //POST - Crear character
  async create(createCharacterDto: CreateCharacterDto) {
    // Extraemos propertyId, favPlacesIds y el resto de campos del DTO
    const { propertyId, favPlacesIds = [], ...characterDetails } =
      createCharacterDto as any;

    // #1 se valida la propiedad que tiene character (su relacion oneToOne)  
    let property: Location | null = null;
      // Si el usuario envía propertyId, validate que exista la locacion
    if (propertyId) {
      property = await this.locationRepository.findOne({
        where: { id: propertyId },
      });
      if (!property) {
        throw new NotFoundException('La propiedad indicada no existe');
      }
    }
    // #2 se validan las locaciones favoritas que tiene el character (su relacion manyToMany)
    let favPlaces: Location[] = [];
    if (favPlacesIds && favPlacesIds.length > 0) {
      favPlaces = await this.locationRepository.find({
        where: { id: In(favPlacesIds) },
      });
      // si no coinciden todas, significa que alguna no existe
      if (favPlaces.length !== favPlacesIds.length) {
        throw new BadRequestException(
          'Alguna de las locaciones favoritas no existe',
        );
      }
    }
    // 3. Crear el personaje con sus relaciones 
    const character = this.characterRepository.create({
      ...characterDetails, 
      property,
      favPlaces,
    });

    await this.characterRepository.save(character);
    return character;
  }

  // PATCH - Agregar una locacion a la lista de favs del personaje
  async addFavoriteLocation(id: number, locationId: number) {
    // #1 Buscar al personaje junto con sus locaciones favoritas actuales
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: { favPlaces: true },
    });

    if (!character) {
      throw new NotFoundException('Personaje no encontrado');
    }
    // #2 Buscar la locacion que se quiere marcar como favorita
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });

    if (!location) {
      throw new NotFoundException('Locación no encontrada');
    }
    character.favPlaces = character.favPlaces ?? [];

    // #3 Verificar si la locación ya está en favoritos para no duplicarla
    const alreadyFav = character.favPlaces.some((l) => l.id === location.id);
    if (!alreadyFav) {
      // Si no está, se agrega al arreglo y se guarda el personaje
      character.favPlaces.push(location);
      await this.characterRepository.save(character);
    }

    return character;
  }

  // GET - Calcular impuestos del personaje
  async calculateTaxes(id: number) {
    const character = await this.characterRepository.findOne({
      where: { id },
      relations: { property: true },
    });

    if (!character) {
      throw new NotFoundException('Personaje no encontrado');
    }
    if (!character.property) {
      return { taxDebt: 0 };
    }

    // COEF = 0.08 si es empleado, 0.03 si no
    const coef = character.employee ? 0.08 : 0.03;

    // Costo de la LOCACIÓN * (1 + COEF)
    const taxDebt = character.property.cost * (1 + coef);

    return { taxDebt };
  }
}
