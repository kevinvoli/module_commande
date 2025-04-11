import { Controller, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RayonsService } from './rayons.service';
import { CreateRayonDto } from './dto/create-rayon.dto';
import { UpdateRayonDto } from './dto/update-rayon.dto';
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
export class RayonsController {
  constructor(private readonly rayonsService: RayonsService) {}

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rayons'),
    (ability) => ability.can(Action.Create, 'rayons'),
  )
  @MessagePattern({cmd:'create_rayon'})
  async create(@Payload() createRayonDto: CreateRayonDto) {
    return await this.rayonsService.create(createRayonDto);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rayons'),
  )
  @MessagePattern({cmd:'findAll_rayon'})
  async findAll() {
    return await this.rayonsService.findAll();
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rayons'),
  )
  @MessagePattern({cmd:'findOne_rayon'})
  async findOne(@Payload() id: number) {
    return await this.rayonsService.findOne(id);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rayons'),
    (ability) => ability.can(Action.Update, 'rayons'),
  )
  @MessagePattern({cmd:'update_rayon'})
  async update(@Payload() updateRayonDto: UpdateRayonDto) {
    return await this.rayonsService.update(updateRayonDto.id, updateRayonDto);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'rayons'),
    (ability) => ability.can(Action.Delete, 'rayons'),
  )
  @MessagePattern({cmd:'remove_rayon'})
  async remove(@Payload() data: number) {
    return await this.rayonsService.remove(data);
  }
}
