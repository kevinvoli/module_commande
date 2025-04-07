import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RangementsService } from './rangements.service';
import { CreateRangementDto } from './dto/create-rangement.dto';
import { UpdateRangementDto } from './dto/update-rangement.dto';

@Controller()
export class RangementsController {
  constructor(private readonly rangementsService: RangementsService) {}

  @MessagePattern({cmd:'create_rangement'})
  async create(@Payload() createRangementDto: CreateRangementDto) {
    return await this.rangementsService.create(createRangementDto);
  }

  @MessagePattern({cmd:'findAll_rangement'})
  async findAll() {
    return await this.rangementsService.findAll();
  }

  @MessagePattern({cmd:'findOne_rangement'})
  async findOne(@Payload() id: number) {
    return await this.rangementsService.findOne(id);
  }

  @MessagePattern({cmd:'update_rangement'})
  async update(@Payload() updateRangementDto: UpdateRangementDto) {
    return await this.rangementsService.update(updateRangementDto.id, updateRangementDto);
  }

  @MessagePattern({cmd:'remove_rangement'})
  async remove(@Payload() id: number) {
    return await this.rangementsService.remove(id);
  }
}
