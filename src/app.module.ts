import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProduitModule } from './produit/produit.module';
import { CategorieModule } from './categorie/categorie.module';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { MouvementsStockModule } from './mouvements_stock/mouvements_stock.module';
import { CaslModule } from './casl/casl.module';
import { EntrepotsModule } from './entrepots/entrepots.module';
import { RangementsModule } from './rangements/rangements.module';
import { RayonsModule } from './rayons/rayons.module';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmRpcExceptionFilter } from './utils/rpc-exception.filter';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { EntityLoader } from './casl/entity-loader.service';



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

  ProduitModule,
  CategorieModule, 
  DatabaseModule, 
  MouvementsStockModule, 
  CaslModule,
  EntrepotsModule,
  RangementsModule,
  RayonsModule 
],
  providers: [
    {
      provide:APP_FILTER,
      useClass:TypeOrmRpcExceptionFilter
    },
    AppService],
})
export class AppModule {}
