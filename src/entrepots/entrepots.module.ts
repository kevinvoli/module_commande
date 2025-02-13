import { Module } from '@nestjs/common';
import { EntrepotsService } from './entrepots.service';
import { EntrepotsController } from './entrepots.controller';

@Module({
  controllers: [EntrepotsController],
  providers: [EntrepotsService],
})
export class EntrepotsModule {}
