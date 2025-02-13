import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RayonsService } from './rayons.service';
import { CreateRayonDto } from './dto/create-rayon.dto';
import { UpdateRayonDto } from './dto/update-rayon.dto';

@Controller()
export class RayonsController {
  constructor(private readonly rayonsService: RayonsService) {}

  @MessagePattern('createRayon')
  create(@Payload() createRayonDto: CreateRayonDto) {
    return this.rayonsService.create(createRayonDto);
  }

  @MessagePattern('findAllRayons')
  findAll() {
    return this.rayonsService.findAll();
  }

  @MessagePattern('findOneRayon')
  findOne(@Payload() id: number) {
    return this.rayonsService.findOne(id);
  }

  @MessagePattern('updateRayon')
  update(@Payload() updateRayonDto: UpdateRayonDto) {
    return this.rayonsService.update(updateRayonDto.id, updateRayonDto);
  }

  @MessagePattern('removeRayon')
  remove(@Payload() id: number) {
    return this.rayonsService.remove(id);
  }
}
