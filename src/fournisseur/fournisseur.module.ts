import { Module } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { FournisseurController } from './fournisseur.controller';
import { Fournisseurs } from './entities/fournisseur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Fournisseurs
     ]),
  ],
  controllers: [FournisseurController],
  providers: [FournisseurService],
})
export class FournisseurModule {}
