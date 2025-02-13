import { Module } from '@nestjs/common';
import { RayonsService } from './rayons.service';
import { RayonsController } from './rayons.controller';

@Module({
  controllers: [RayonsController],
  providers: [RayonsService],
})
export class RayonsModule {}
