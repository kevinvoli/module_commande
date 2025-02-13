import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RangementsService } from './rangements.service';
import { CreateRangementDto } from './dto/create-rangement.dto';
import { UpdateRangementDto } from './dto/update-rangement.dto';

@Controller()
export class RangementsController {
  constructor(private readonly rangementsService: RangementsService) {}

  @MessagePattern('createRangement')
  create(@Payload() createRangementDto: CreateRangementDto) {
    return this.rangementsService.create(createRangementDto);
  }

  @MessagePattern('findAllRangements')
  findAll() {
    return this.rangementsService.findAll();
  }

  @MessagePattern('findOneRangement')
  findOne(@Payload() id: number) {
    return this.rangementsService.findOne(id);
  }

  @MessagePattern('updateRangement')
  update(@Payload() updateRangementDto: UpdateRangementDto) {
    return this.rangementsService.update(updateRangementDto.id, updateRangementDto);
  }

  @MessagePattern('removeRangement')
  remove(@Payload() id: number) {
    return this.rangementsService.remove(id);
  }
}
