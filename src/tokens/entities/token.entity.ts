import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity()
export class Token {


    @ApiProperty({example:'26b071e4-75f9-4897-bec8-0591804360e9', description:'Identificador único del la llave'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
