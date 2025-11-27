import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

@Controller('token')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }
  
  @Get(':idToken')
  canUse(@Param('idToken') idToken: string) {
    return this.tokensService.canUse(idToken);
  }
  @Patch('reduce/:idToken')
  reduceRequests(@Param('idToken') idToken: string) {
    return this.tokensService.reduceRequests(idToken);
  }



  
}
