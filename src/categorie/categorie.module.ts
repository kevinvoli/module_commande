import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categorie.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ConfigService } from '@nestjs/config';
import { EntityLoader } from 'src/casl/entity-loader.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Categories,
      
     ]),
  ],
  providers: [
  
    CategorieService,
        CaslAbilityFactory,
        ConfigService,
        EntityLoader
  ], // Définit CategorieService comme un 
  controllers: [CategorieController],
})
export class CategorieModule {}
