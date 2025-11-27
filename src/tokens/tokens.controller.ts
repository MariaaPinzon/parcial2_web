import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }
  @Patch('reduce/:idToken')
  reduceRequests(@Param('idToken') idToken: string) {
    return this.tokensService.reduceRequests(idToken);
  }

    @Get()
     findAll() {
    return this.tokensService.findAll();
  }

  
}
