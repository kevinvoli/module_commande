import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntrepotsService } from './entrepots.service';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';

@Controller()
export class EntrepotsController {
  constructor(private readonly entrepotsService: EntrepotsService) {}

  @MessagePattern({cmd:'create_entrepot'})
  async create(@Payload() createEntrepotDto: CreateEntrepotDto) {
    return await this.entrepotsService.create(createEntrepotDto);
  }

  @MessagePattern({cmd:'findAll_entrepot'})
  async findAll() {
    return await this.entrepotsService.findAll();
  }

  @MessagePattern({cmd:'findOne_entrepot'})
  async findOne(@Payload() id: number) {
    return await this.entrepotsService.findOne(id);
  }

  @MessagePattern({cmd:'update_entrepot'})
  async update(@Payload() updateEntrepotDto: UpdateEntrepotDto) {
    return await this.entrepotsService.update(updateEntrepotDto.id, updateEntrepotDto);
  }

  @MessagePattern({cmd:'remove_entrepot'})
  async remove(@Payload() id: number) {
    return await this.entrepotsService.remove(id);
  }
}
