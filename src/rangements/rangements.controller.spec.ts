import { Test, TestingModule } from '@nestjs/testing';
import { RangementsController } from './rangements.controller';
import { RangementsService } from './rangements.service';

describe('RangementsController', () => {
  let controller: RangementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RangementsController],
      providers: [RangementsService],
    }).compile();

    controller = module.get<RangementsController>(RangementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
