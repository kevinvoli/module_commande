import { Module } from '@nestjs/common';
import { RayonsService } from './rayons.service';
import { RayonsController } from './rayons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rayons } from './entities/rayon.entity';
import { EntrepotsService } from 'src/entrepots/entrepots.service';
import { Entrepots } from 'src/entrepots/entities/entrepot.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { EntityLoader } from 'src/casl/entity-loader.service';

@Module({
   imports:[
        TypeOrmModule.forFeature([
          Rayons,Entrepots
         ]),
      ],
  controllers: [RayonsController],
  providers: [
    RayonsService, 
    EntrepotsService,
    CaslAbilityFactory,
    EntityLoader
  ],
})
export class RayonsModule {}
