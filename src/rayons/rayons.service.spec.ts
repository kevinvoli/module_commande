import { Test, TestingModule } from '@nestjs/testing';
import { RayonsService } from './rayons.service';

describe('RayonsService', () => {
  let service: RayonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RayonsService],
    }).compile();

    service = module.get<RayonsService>(RayonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
