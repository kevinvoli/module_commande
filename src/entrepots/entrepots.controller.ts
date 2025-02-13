import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntrepotsService } from './entrepots.service';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';

@Controller()
export class EntrepotsController {
  constructor(private readonly entrepotsService: EntrepotsService) {}

  @MessagePattern('createEntrepot')
  create(@Payload() createEntrepotDto: CreateEntrepotDto) {
    return this.entrepotsService.create(createEntrepotDto);
  }

  @MessagePattern('findAllEntrepots')
  findAll() {
    return this.entrepotsService.findAll();
  }

  @MessagePattern('findOneEntrepot')
  findOne(@Payload() id: number) {
    return this.entrepotsService.findOne(id);
  }

  @MessagePattern('updateEntrepot')
  update(@Payload() updateEntrepotDto: UpdateEntrepotDto) {
    return this.entrepotsService.update(updateEntrepotDto.id, updateEntrepotDto);
  }

  @MessagePattern('removeEntrepot')
  remove(@Payload() id: number) {
    return this.entrepotsService.remove(id);
  }
}
