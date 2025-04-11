import { Module } from '@nestjs/common';
import { RangementsService } from './rangements.service';
import { RangementsController } from './rangements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rangements } from './entities/rangement.entity';
import { RayonsService } from 'src/rayons/rayons.service';
import { Rayons } from 'src/rayons/entities/rayon.entity';
import { EntrepotsService } from 'src/entrepots/entrepots.service';
import { Entrepots } from 'src/entrepots/entities/entrepot.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { EntityLoader } from 'src/casl/entity-loader.service';

@Module({
   imports:[
        TypeOrmModule.forFeature([
          Rangements,Rayons,Entrepots
         ]),
      ],
  controllers: [RangementsController],
  providers: [
    RangementsService,
    RayonsService,
    EntrepotsService,
    CaslAbilityFactory,
    EntityLoader

  ],
})
export class RangementsModule {}
