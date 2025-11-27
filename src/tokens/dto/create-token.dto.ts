import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsPositive } from 'class-validator';


export class CreateTokenDto {

    @ApiProperty({example:'abcdefg', description:'token unico de la api'})
    @IsString()
    token: string;

    @ApiProperty({example:true, description :'Indica si la llave esta activa'})
    @IsOptional()
    active?: boolean;

    @ApiProperty({example: 10, description: 'cantidad de peticiones que le quedan a la api'})
    @IsOptional()
    @IsPositive()
    reqLeft?:number;
}
