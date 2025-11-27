import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { ApiTokenGuard } from 'src/guards/api-token.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [TokensController],
  providers: [
    TokensService,
    ApiTokenGuard,      
  ],
  exports: [
    ApiTokenGuard,    
    TokensService,      
  ],
})
export class TokensModule {}
