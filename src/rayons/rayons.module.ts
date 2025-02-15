import { Module } from '@nestjs/common';
import { RayonsService } from './rayons.service';
import { RayonsController } from './rayons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rayons } from './entities/rayon.entity';
import { EntrepotsService } from 'src/entrepots/entrepots.service';
import { Entrepots } from 'src/entrepots/entities/entrepot.entity';

@Module({
   imports:[
        TypeOrmModule.forFeature([
          Rayons,Entrepots
         ]),
      ],
  controllers: [RayonsController],
  providers: [RayonsService, EntrepotsService],
})
export class RayonsModule {}
