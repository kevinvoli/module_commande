import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './entities/categorie.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Categories
     ]),
  ],
  providers: [CategorieService], // Définit CategorieService comme un fournisseur
  exports: [CategorieService],   // Exporte CategorieService pour qu'il soit utilisé ailleurs
  controllers: [CategorieController],
})
export class CategorieModule {}
