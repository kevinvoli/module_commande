import { Controller, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RangementsService } from './rangements.service';
import { CreateRangementDto } from './dto/create-rangement.dto';
import { UpdateRangementDto } from './dto/update-rangement.dto';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/casl/entities/permission.entity';

@Controller()
@UsePipes(new ValidationPipe({
  whitelist:true,
  exceptionFactory: (errors) =>{
  return new RpcException(errors);}})
)
@UseGuards(PoliciesGuard) 
export class RangementsController {
  constructor(private readonly rangementsService: RangementsService) {}

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rangements'),
    (ability) => ability.can(Action.Create, 'rangements'),
  )
  @MessagePattern({cmd:'create_rangement'})
  async create(@Payload() createRangementDto: CreateRangementDto) {
    return await this.rangementsService.create(createRangementDto);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rangements'),
  )
  @MessagePattern({cmd:'findAll_rangement'})
  async findAll() {
    return await this.rangementsService.findAll();
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rangements'),
  )
  @MessagePattern({cmd:'findOne_rangement'})
  async findOne(@Payload() data: number) {
    return await this.rangementsService.findOne(data);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rangements'),
    (ability) => ability.can(Action.Update, 'rangements'),
  )
  @MessagePattern({cmd:'update_rangement'})
  async update(@Payload() updateRangementDto: UpdateRangementDto) {
    return await this.rangementsService.update(updateRangementDto.id, updateRangementDto);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rangements'),
    (ability) => ability.can(Action.Delete, 'rangements'),
  )
  @MessagePattern({cmd:'remove_rangement'})
  async remove(@Payload() data: number) {
    return await this.rangementsService.remove(data);
  }
}
