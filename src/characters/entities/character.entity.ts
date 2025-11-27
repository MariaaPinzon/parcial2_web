import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, JoinTable,} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class Character {
  @ApiProperty({ example: 1, description: 'Identificador unico del personaje' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Mario', description: 'Nombre del personaje' })
  @Column()
  name: string;

  @ApiProperty({ example: 1500, description: 'Salario del personaje' })
  @Column('int')
  salary: number;

  @ApiProperty({example: true,description: 'Indica si el personaje es un empleado'})
  @Column({ default: false })
  employee: boolean;

  @ApiProperty({ description: 'Locación que es propiedad del personaje',type: () => Location, required: false})
  @OneToOne(() => Location, (location) => location.owner)
  property?: Location;

  @ApiProperty({ description: 'Locaciones favoritas del personaje',type: () => [Location],required: false})
  @ManyToMany(() => Location, (location) => location.favCharacters)
  @JoinTable() // lado dueño de la relación 
  favPlaces?: Location[];
}
