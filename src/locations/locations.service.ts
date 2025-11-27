import {BadRequestException,Injectable,NotFoundException} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Location } from './entities/location.entity';
import { Character } from '../characters/entities/character.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,

    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

 // POST /location - Crear locación
  async create(createLocationDto: CreateLocationDto) {
    // Extraer esto
    const { ownerId, favCharactersIds = [], ...locationDetails } =
      createLocationDto as any;

    let owner: Character | null = null;

    // #1 validar dueño de propiedad
    if (ownerId) {
      owner = await this.characterRepository.findOne({
        where: { id: ownerId },
      });

      if (!owner) {
        throw new NotFoundException('El dueño indicado no existe');
      }
      //  validar que el dueño no tenga otra propiedad
      const existingProperty = await this.locationRepository.findOne({
        where: { owner: { id: ownerId } },
        relations: { owner: true },
      });

      if (existingProperty) {
        throw new BadRequestException(
          'Este personaje ya posee otra propiedad',
        );
      }
    }
    // #2 validar personajes favoritos, validar relacion
    let favCharacters: Character[] = [];
    if (favCharactersIds && favCharactersIds.length > 0) {
      favCharacters = await this.characterRepository.find({
        where: { id: In(favCharactersIds) },
      });

      if (favCharacters.length !== favCharactersIds.length) {
        throw new BadRequestException(
          'Alguno de los personajes favoritos no existe',
        );
      }
    }
    // #3 crear la locacion con esas relaciones
    const location = this.locationRepository.create({
      ...locationDetails, // name, type, cost
      owner,
      favCharacters,
    });

    await this.locationRepository.save(location);
    return location;
  }

  // GET /location
  async findAllWithFavVisitors() {
    return this.locationRepository.find({
      relations: {
        owner: true,
        favCharacters: true,
      },
    });
  }
}
