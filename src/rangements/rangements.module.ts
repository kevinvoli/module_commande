import { Module } from '@nestjs/common';
import { RangementsService } from './rangements.service';
import { RangementsController } from './rangements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rangements } from './entities/rangement.entity';
import { RayonsService } from 'src/rayons/rayons.service';
import { Rayons } from 'src/rayons/entities/rayon.entity';
import { EntrepotsService } from 'src/entrepots/entrepots.service';
import { Entrepots } from 'src/entrepots/entities/entrepot.entity';

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

  ],
})
export class RangementsModule {}
