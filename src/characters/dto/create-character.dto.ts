import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsBoolean, IsInt, IsNumber,IsOptional,IsString } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty({ example: 'Maria Perez', description: 'Nombre del personaje' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1500, description: 'Salario del personaje' })
  @IsNumber()
  salary: number;

  @ApiProperty({ example: true,description: 'Indica si el personaje es un empleado',required: false})
  @IsOptional()
  @IsBoolean()
  employee?: boolean;

  @ApiProperty({example: 1, description: 'Id de la locación propiedad del personaje', required: false})
  @IsOptional()
  @IsInt()
  propertyId?: number;

  @ApiProperty({example: [1, 2],description: 'Ids de locaciones favoritas del personaje',required: false})
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  favPlacesIds?: number[];
}
