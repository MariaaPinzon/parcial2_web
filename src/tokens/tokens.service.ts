import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class TokensService {
  constructor(

    @InjectRepository(Token) // inyectar repositorio para interactuar con la BD
    private readonly tokenRepository: Repository<Token>,

  ) {}

  //POST Crear token
  async create(createTokenDto: CreateTokenDto) {

    // crear token con valores por defecto
    const token = this.tokenRepository.create({
      active: true,
      reqLeft: 10,
      ...createTokenDto,
    });

    await this.tokenRepository.save(token);
    return token; 
  }

  // GET - Validar si un token se puede usar en un request 
  async canUse(idToken: string): Promise<boolean>{
    const token = await this.tokenRepository.findOne({
      where: {token: idToken},
    });
    if (!token){
      return false;
  }
    // activo y con solicitudes
    const canBeUsed = token.active && token.reqLeft > 0;
    return canBeUsed;
  }

  // PATCH - Reducir reqLeft Token
  async reduceRequests(idToken: string) {
    const token = await this.tokenRepository.findOne({
      where: { token: idToken },
    });

    if (!token) {
      throw new ForbiddenException('Token no encontrado');
    }
    if (!token.active) {
      throw new ForbiddenException('API no está activa');
    }
    if (token.reqLeft <= 0) {
      throw new ForbiddenException('Sin solicitudes restantes');
    }

    token.reqLeft -= 1;
    if (token.reqLeft === 0) {
      token.active = false;
    }

    await this.tokenRepository.save(token);
    return token;
  }


}
