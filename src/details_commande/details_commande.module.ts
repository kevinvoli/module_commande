import { Module } from '@nestjs/common';
import { DetailsCommandeService } from './details_commande.service';
import { DetailsCommandeController } from './details_commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commandes } from 'src/commande/entities/commande.entity';
import { DetailsCommandes } from './entities/details_commande.entity';
import { Produits } from 'src/produit/entities/produit.entity';
import { CommandeService } from 'src/commande/commande.service';
import { ProduitService } from 'src/produit/produit.service';
import { ClientService } from 'src/client/client.service';
import { FournisseurService } from 'src/fournisseur/fournisseur.service';
import { CategorieService } from 'src/categorie/categorie.service';
import { Clients } from 'src/client/entities/client.entity';
import { Fournisseurs } from 'src/fournisseur/entities/fournisseur.entity';
import { Categories } from 'src/categorie/entities/categorie.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      DetailsCommandes,
      Produits,
      Commandes,
      Clients,
      Fournisseurs,
      Categories
     ]),
  ],
  controllers: [DetailsCommandeController],
  providers: [
    DetailsCommandeService,
    CommandeService,
    ProduitService,
    ClientService,
    FournisseurService,
    CategorieService

  ],
})
export class DetailsCommandeModule {}
