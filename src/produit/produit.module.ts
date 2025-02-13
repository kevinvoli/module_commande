import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { Produits } from './entities/produit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/categorie/entities/categorie.entity';
import { CategorieService } from 'src/categorie/categorie.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ConfigService } from '@nestjs/config';
import { EntityLoader } from 'src/casl/entity-loader.service';
import { Permissions } from 'src/casl/entities/permission.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Produits,
      Categories,
      Permissions
     ]),
  ],
  controllers: [ProduitController],
  providers: [ProduitService,
    CategorieService,
    CaslAbilityFactory,
    ConfigService,
    EntityLoader
  ],
})
export class ProduitModule {}
