import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

// para el post de character
export class CreateCharacterDto {

    @ApiProperty({example:'Maria Perez', description:'Nombre del personaje'})
    @IsString()
    name: string;

    @ApiProperty({example:1500, description:'Salario del personaje'})
    salary: number;

    @ApiProperty({example:true, description:'Indica si el personaje es un empleado'})
    @IsOptional()
    employee?: boolean;

    @ApiProperty({example:1, description:'Identificador unico de la locacion del personaje'})
    @IsOptional()
    property?: number;

    @ApiProperty({example:[1,2], description:'Identificadores unicos de las locaciones favoritas del personaje'})
    @IsOptional()
    favPlaces?: number[];



}
