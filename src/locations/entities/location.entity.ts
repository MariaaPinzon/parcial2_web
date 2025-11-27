import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Character } from '../../characters/entities/character.entity';

@Entity()
export class Location {
  @ApiProperty({ example: 1, description: 'Identificador único de la locación' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Mansión', description: 'Nombre de la locación' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Residencial', description: 'Tipo de locación' })
  @Column()
  type: string;

  @ApiProperty({ example: 5000, description: 'Costo de la locación' })
  @Column('int')
  cost: number;

  @ApiProperty({description: 'Personaje dueño de la locación',type: () => Character,required: false,})
  @OneToOne(() => Character, (character) => character.property)
  @JoinColumn() // esta tabla guarda la FK
  owner?: Character;

  @ApiProperty({description: 'Personajes que tienen esta locación como favorita',type: () => [Character],required: false,})
  @ManyToMany(() => Character, (character) => character.favPlaces)
  favCharacters?: Character[];
}
