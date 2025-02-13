import { Test, TestingModule } from '@nestjs/testing';
import { MouvementsStockController } from './mouvements_stock.controller';
import { MouvementsStockService } from './mouvements_stock.service';

describe('MouvementsStockController', () => {
  let controller: MouvementsStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MouvementsStockController],
      providers: [MouvementsStockService],
    }).compile();

    controller = module.get<MouvementsStockController>(MouvementsStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
