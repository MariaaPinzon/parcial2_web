import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

// para post El dueño debe existir y No debe poseer otra propiedad
export class CreateLocationDto {
    @ApiProperty({example:'Mansion', description:'Nombre de la locacion'})
    @IsString()
    name: string;

    @ApiProperty({example:'Residencial', description:'Tipo de locacion'})
    @IsString()
    type: string;

    @ApiProperty({example:5000, description:'Costo de la locacion'})
    cost: number;

    @ApiProperty({example:1, description:'Identificador unico del personaje dueño de la locacion'})
    @IsOptional()
    owner?: number;

    @ApiProperty({example:[1,2], description:'Identificadores unicos de los personajes que tienen esta locacion como favorita'  })
    @IsOptional()
    favCharacters?: number[];
}
