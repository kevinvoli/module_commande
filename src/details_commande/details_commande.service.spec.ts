import { Test, TestingModule } from '@nestjs/testing';
import { DetailsCommandeService } from './details_commande.service';

describe('DetailsCommandeService', () => {
  let service: DetailsCommandeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailsCommandeService],
    }).compile();

    service = module.get<DetailsCommandeService>(DetailsCommandeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
