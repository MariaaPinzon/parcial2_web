import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsInt,IsNumber,IsOptional,IsString,} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 'Mansión', description: 'Nombre de la locación' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Residencial', description: 'Tipo de locación' })
  @IsString()
  type: string;

  @ApiProperty({ example: 5000, description: 'Costo de la locación' })
  @IsNumber()
  cost: number;

  @ApiProperty({example: 1,description: 'Id del personaje dueño de la locación',required: false})
  @IsOptional()
  @IsInt()
  ownerId?: number;

  @ApiProperty({example: [1, 2],description:'Ids de los personajes que tienen esta locación como favorita',required: false})
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  favCharactersIds?: number[];
}
