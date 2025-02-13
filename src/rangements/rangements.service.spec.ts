import { Test, TestingModule } from '@nestjs/testing';
import { RangementsService } from './rangements.service';

describe('RangementsService', () => {
  let service: RangementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RangementsService],
    }).compile();

    service = module.get<RangementsService>(RangementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
