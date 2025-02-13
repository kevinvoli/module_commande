import { PartialType } from '@nestjs/mapped-types';
import { CreateMouvementsStockDto } from './create-mouvements_stock.dto';

export class UpdateMouvementsStockDto extends PartialType(CreateMouvementsStockDto) {
  id: number;
}
