import { Module } from '@nestjs/common';
import { EntrepotsService } from './entrepots.service';
import { EntrepotsController } from './entrepots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrepots } from './entities/entrepot.entity';

@Module({
  imports:[
      TypeOrmModule.forFeature([
        Entrepots
       ]),
    ],
  controllers: [EntrepotsController],
  providers: [EntrepotsService],
})
export class EntrepotsModule {}
