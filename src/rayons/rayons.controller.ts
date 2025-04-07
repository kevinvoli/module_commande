import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RayonsService } from './rayons.service';
import { CreateRayonDto } from './dto/create-rayon.dto';
import { UpdateRayonDto } from './dto/update-rayon.dto';

@Controller()
export class RayonsController {
  constructor(private readonly rayonsService: RayonsService) {}

  @MessagePattern({cmd:'create_rayon'})
  async create(@Payload() createRayonDto: CreateRayonDto) {
    return await this.rayonsService.create(createRayonDto);
  }

  @MessagePattern({cmd:'findAll_rayon'})
  async findAll() {
    return await this.rayonsService.findAll();
  }

  @MessagePattern({cmd:'findOne_rayon'})
  async findOne(@Payload() id: number) {
    return await this.rayonsService.findOne(id);
  }

  @MessagePattern({cmd:'update_rayon'})
  async update(@Payload() updateRayonDto: UpdateRayonDto) {
    return await this.rayonsService.update(updateRayonDto.id, updateRayonDto);
  }

  @MessagePattern({cmd:'remove_rayon'})
  async remove(@Payload() id: number) {
    return await this.rayonsService.remove(id);
  }
}
