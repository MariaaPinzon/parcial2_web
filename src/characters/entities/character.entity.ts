import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../locations/entities/location.entity';

// id: autoincremental
// name: string
// salary: number
// employee: boolean
// property: Location - One to one con Location, la fk se la lleva location - JoinColumn
// favPlaces: Location[] - JoinTable

export class Character {

    @ApiProperty({example:1, description:'Identificador unico del personaje'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example:'Mario', description:'Nombre del personaje'})
    @Column()
    name: string;

    @ApiProperty({example:1500, description:'Salario del personaje'})
    @Column('int')
    salary: number;

    @ApiProperty({example:true, description:'Indica si el personaje es un empleado'})
    @Column({default:false})
    employee: boolean;

    @OneToOne(() => Location, location => location.owner)
    @ApiProperty({example:1, description:'Identificador unico de la locacion del personaje'})
    property: number;

    @ManyToMany(()=> Location, location => location.favCharacters)
    @ApiProperty({example:[1,2], description:'Identificadores unicos de las locaciones favoritas del personaje'})
    favPlaces: number[];




}
