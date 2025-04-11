import { Controller, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { EntrepotsService } from './entrepots.service';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';
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
export class EntrepotsController {
  constructor(private readonly entrepotsService: EntrepotsService) {}


  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'entrepots'),
    (ability) => ability.can(Action.Create, 'entrepots'),
  )
  @MessagePattern({cmd:'create_entrepot'})
  async create(@Payload() createEntrepotDto: CreateEntrepotDto) {
    return await this.entrepotsService.create(createEntrepotDto);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'entrepots'),
  )
  @MessagePattern({cmd:'findAll_entrepot'})
  async findAll() {
    return await this.entrepotsService.findAll();
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'entrepots'),
  )
  @MessagePattern({cmd:'findOne_entrepot'})
  async findOne(@Payload() data: number) {
    return await this.entrepotsService.findOne(data);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'perentrepotsmission'),
    (ability) => ability.can(Action.Update, 'entrepots'),
  )
  @MessagePattern({cmd:'update_entrepot'})
  async update(@Payload() updateEntrepotDto: UpdateEntrepotDto) {
    return await this.entrepotsService.update(updateEntrepotDto.id, updateEntrepotDto);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'entrepots'),
    (ability) => ability.can(Action.Delete, 'entrepots'),
  )
  @MessagePattern({cmd:'remove_entrepot'})
  async remove(@Payload() data: number) {
    return await this.entrepotsService.remove(data);
  }
}
