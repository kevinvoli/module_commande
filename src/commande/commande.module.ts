import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { FournisseurService } from 'src/fournisseur/fournisseur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fournisseurs } from 'src/fournisseur/entities/fournisseur.entity';
import { Commandes } from './entities/commande.entity';
import { Clients } from 'src/client/entities/client.entity';
import { ClientService } from 'src/client/client.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Fournisseurs,
      Commandes,
      Clients
     ]),
  ],
  controllers: [CommandeController],
  providers: [
    CommandeService, 
    FournisseurService,
    ClientService,
   
  ],
})
export class CommandeModule {}
