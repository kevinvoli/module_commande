import { Test, TestingModule } from '@nestjs/testing';
import { RayonsController } from './rayons.controller';
import { RayonsService } from './rayons.service';

describe('RayonsController', () => {
  let controller: RayonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RayonsController],
      providers: [RayonsService],
    }).compile();

    controller = module.get<RayonsController>(RayonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
