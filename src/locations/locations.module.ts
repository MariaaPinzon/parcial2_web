import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Character } from '../characters/entities/character.entity';
import { TokensModule } from 'src/tokens/tokens.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, Character]),TokensModule ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
