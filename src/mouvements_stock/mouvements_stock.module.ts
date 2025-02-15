import { Module } from '@nestjs/common';
import { MouvementsStockService } from './mouvements_stock.service';
import { MouvementsStockController } from './mouvements_stock.controller';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ConfigService } from '@nestjs/config';
import { EntityLoader } from 'src/casl/entity-loader.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MouvementsStock } from './entities/mouvements_stock.entity';

@Module({
    imports:[
      TypeOrmModule.forFeature([
        MouvementsStock
       ]),
    ],
  controllers: [MouvementsStockController],
  providers: [
    MouvementsStockService,
    CaslAbilityFactory,
    ConfigService,
    EntityLoader
  ],
})
export class MouvementsStockModule {}
