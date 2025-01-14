import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandeModule } from './commande/commande.module';
import { FournisseurModule } from './fournisseur/fournisseur.module';
import { ProduitModule } from './produit/produit.module';
import { ClientModule } from './client/client.module';
import { CategorieModule } from './categorie/categorie.module';
import { DetailsCommandeModule } from './details_commande/details_commande.module';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      MYSQL_HOST:Joi.string().required(),
      MYSQL_PORT:Joi.number().required(),
      MYSQL_USER:Joi.string().required(),
      MYSQL_PASSWORD: Joi.string().required(),
      MYSQL_DATABASE:Joi.string().required(),
      SERVER_PORT:Joi.number().required()
    })
  }),
  CommandeModule, 
  FournisseurModule, 
  ProduitModule,
  ClientModule, 
  CategorieModule, 
  DetailsCommandeModule, 
  DatabaseModule, 
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
