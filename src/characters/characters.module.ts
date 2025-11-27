import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from '../locations/entities/location.entity';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Location]), TokensModule],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
