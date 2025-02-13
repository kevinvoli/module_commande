import { Module } from '@nestjs/common';
import { RangementsService } from './rangements.service';
import { RangementsController } from './rangements.controller';

@Module({
  controllers: [RangementsController],
  providers: [RangementsService],
})
export class RangementsModule {}
