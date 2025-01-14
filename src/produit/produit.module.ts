import { Module } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { Produits } from './entities/produit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/categorie/entities/categorie.entity';
import { CategorieService } from 'src/categorie/categorie.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Produits,
      Categories
     ]),
  ],
  controllers: [ProduitController],
  providers: [ProduitService, CategorieService],
})
export class ProduitModule {}
