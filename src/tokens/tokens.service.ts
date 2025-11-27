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

    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,

  ) {}


   async create(createTokenDto: CreateTokenDto) {
    const token = this.tokenRepository.create(createTokenDto);
    if (!token.active) {
      throw new ForbiddenException('API no esta activa');
    }

    if (token.reqLeft <= 0) {
      throw new ForbiddenException('Sin solicitudes restantes');
    }

    await this.tokenRepository.save(token);
    return true;
  }


  async reduceRequests(idToken: string) {
    const token = await this.tokenRepository.findOne({
      where: { token: idToken },
    });
    if (!token) {
      throw new ForbiddenException('Token no encontrado');
    }
    if (!token.active) {
      throw new ForbiddenException('API no esta activa');
    }
    if (token.reqLeft <= 0) {
      throw new ForbiddenException('Sin solicitudes restantes');
    }
    token.reqLeft -= 1;
    await this.tokenRepository.save(token);
    return token;
  }

    findAll() {
    return `This action returns all tags`;
  }

}
