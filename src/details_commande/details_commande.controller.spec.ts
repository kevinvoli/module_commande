import { Test, TestingModule } from '@nestjs/testing';
import { DetailsCommandeController } from './details_commande.controller';
import { DetailsCommandeService } from './details_commande.service';

describe('DetailsCommandeController', () => {
  let controller: DetailsCommandeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsCommandeController],
      providers: [DetailsCommandeService],
    }).compile();

    controller = module.get<DetailsCommandeController>(DetailsCommandeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
