import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Character } from '../../characters/entities/character.entity';


export class Location {

    @ApiProperty({example:1, description:'Identificador unico de la locacion'})
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({example:'Mansion', description:'Nombre de la locacion'})
    @Column()
    name: string;

    @ApiProperty({example:'Residencial', description:'Tipo de locacion'})
    @Column()
    type: string;

    @ApiProperty({example:5000, description:'Costo de la locacion'})
    @Column('int')
    cost: number;

    @OneToOne(()=>Character, character => character.property)
    @ApiProperty({example:1, description:'Identificador unico del personaje dueño de la locacion'})
    owner: number;

    @ManyToMany(()=> Character, character => character.favPlaces)
    @ApiProperty({example:[1,2], description:'Identificadores unicos de los personajes que tienen esta locacion como favorita'})
    favCharacters: number[];
}
