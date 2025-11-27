import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Token {


    @ApiProperty({example:'absjas', description:'Identificador único del la llave'})
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ApiProperty({example:'abcdefg', description:'token unico de la api'})
    @Column({unique:true})
    token: string;

    @ApiProperty({example:true, description :'Indica si la llave esta activa'})
    @Column({default: true})
    active: boolean;

    @ApiProperty({example: 10, description: 'cantidad de peticiones que le quedan a la api'})
    @Column({default:10})
    reqLeft:number;




}
