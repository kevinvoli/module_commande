import { Module } from '@nestjs/common';
import { EntrepotsService } from './entrepots.service';
import { EntrepotsController } from './entrepots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrepots } from './entities/entrepot.entity';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { EntityLoader } from 'src/casl/entity-loader.service';

@Module({
  imports:[
      TypeOrmModule.forFeature([
        Entrepots
       ]),
    ],
  controllers: [EntrepotsController],
  providers: [
    EntrepotsService,
    CaslAbilityFactory,
    EntityLoader
  ],
})
export class EntrepotsModule {}
