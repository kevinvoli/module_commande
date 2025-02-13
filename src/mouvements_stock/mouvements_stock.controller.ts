import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MouvementsStockService } from './mouvements_stock.service';
import { CreateMouvementsStockDto } from './dto/create-mouvements_stock.dto';
import { UpdateMouvementsStockDto } from './dto/update-mouvements_stock.dto';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/casl/entities/permission.entity';

@Controller()
export class MouvementsStockController {
  constructor(private readonly mouvementsStockService: MouvementsStockService) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'MouvementsStock')
  )
  @MessagePattern('createMouvementsStock')
  create(@Payload() createMouvementsStockDto: CreateMouvementsStockDto) {
    return this.mouvementsStockService.create(createMouvementsStockDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'MouvementsStock')
  )
  @MessagePattern('findAllMouvementsStock')
  findAll() {
    return this.mouvementsStockService.findAll();
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'MouvementsStock')
  )
  @MessagePattern('findOneMouvementsStock')
  findOne(@Payload() id: number) {
    return this.mouvementsStockService.findOne(id);
  }


  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'MouvementsStock')
  )
  @MessagePattern('updateMouvementsStock')
  update(@Payload() updateMouvementsStockDto: UpdateMouvementsStockDto) {
    return this.mouvementsStockService.update(updateMouvementsStockDto.id, updateMouvementsStockDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'MouvementsStock')
  )
  @MessagePattern('removeMouvementsStock')
  remove(@Payload() id: number) {
    return this.mouvementsStockService.remove(id);
  }
}
