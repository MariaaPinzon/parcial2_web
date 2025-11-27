import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
// create para post /token se va a usar en el service
// valida que reqleft es mayor a 0
// valida que este activo

export class CreateTokenDto {

    @ApiProperty({example:'abcdefg', description:'token unico de la api'})
    @IsString()
    token: string;

    @ApiProperty({example:true, description :'Indica si la llave esta activa'})
    @IsOptional()
    active?: boolean;

    @ApiProperty({example: 10, description: 'cantidad de peticiones que le quedan a la api'})
    @IsOptional()
    reqLeft?:number;
}
