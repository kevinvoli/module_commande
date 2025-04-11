import { Controller, NotFoundException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { MouvementsStockService } from './mouvements_stock.service';
import { CreateMouvementsStockDto } from './dto/create-mouvements_stock.dto';
import { UpdateMouvementsStockDto } from './dto/update-mouvements_stock.dto';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/casl/entities/permission.entity';

@Controller()
@UsePipes(new ValidationPipe({
  // transform: true, // Cela transforme les objets bruts en instances de DTO
  whitelist: true, // Cela supprime les propriétés non définies dans le DTO
  exceptionFactory: (errors) =>{
  return new RpcException(errors); 
}}))
@UseGuards(PoliciesGuard) 
export class MouvementsStockController {
  constructor(private readonly mouvementsStockService: MouvementsStockService) {}

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'mouvementsstock'),
    (ability) => ability.can(Action.Create, 'mouvementsstock')

  )
  @MessagePattern({cmd:'create_mouvementsStock'})
  async create(@Payload() createMouvementsStockDto: CreateMouvementsStockDto) {
    try {
      console.log("create_mouvementsStock");
      
      return await this.mouvementsStockService.create(createMouvementsStockDto);
    } catch (error) {
      throw new NotFoundException(error)
    }
   
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'mouvementsstock')
  )
  @MessagePattern({cmd:'findAll_mouvementsStock'})
  async findAll() {
    console.log("find all");
    try {
      return await this.mouvementsStockService.findAll();
    } catch (error) {
      throw new NotFoundException(error)
    }
   
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'mouvementsstock')
  )
  @MessagePattern({cmd:'findOne_mouvementsStock'})
  async    findOne(@Payload() data: number) {
    try {
      return await this.mouvementsStockService.findOne(data);
    } catch (error) {
      throw new NotFoundException(error)
    }
  }


  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'mouvementsstock'),
    (ability) => ability.can(Action.Update, 'mouvementsstock')

  )
  @MessagePattern({cmd:'update_mouvementsStock'})
  async update(@Payload() updateMouvementsStockDto: UpdateMouvementsStockDto) {
    try {
      return await this.mouvementsStockService.update(updateMouvementsStockDto.id, updateMouvementsStockDto);
    } catch (error) {
      throw new NotFoundException(error)
    }
    
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'mouvementsstock'),
    (ability) => ability.can(Action.Delete, 'mouvementsstock')

  )
  @MessagePattern({cmd:'remove_mouvementsStock'})
  async remove(@Payload() data: number) {
    try {
      return await this.mouvementsStockService.remove(data);
    } catch (error) {
      throw new NotFoundException(error)
    }
    
  }
}
