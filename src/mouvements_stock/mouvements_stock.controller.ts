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
  console.log(errors);
 
  return new RpcException(errors);
  
}}))
export class MouvementsStockController {
  constructor(private readonly mouvementsStockService: MouvementsStockService) {}

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'MouvementsStock')
  // )
  @MessagePattern({cmd:'create_mouvementsStock'})
  async create(@Payload() createMouvementsStockDto: CreateMouvementsStockDto) {
    try {
      console.log("create_mouvementsStock");
      
      return await this.mouvementsStockService.create(createMouvementsStockDto);
    } catch (error) {
      throw new NotFoundException(error)
    }
   
  }

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'MouvementsStock')
  // )
  @MessagePattern({cmd:'findAll_mouvementsStock'})
  async findAll() {
    console.log("find all");
    try {
      return await this.mouvementsStockService.findAll();
    } catch (error) {
      throw new NotFoundException(error)
    }
   
  }

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'MouvementsStock')
  // )
  @MessagePattern({cmd:'findOne_mouvementsStock'})
  async    findOne(@Payload() id: number) {
    try {
      return await this.mouvementsStockService.findAll();
    } catch (error) {
      throw new NotFoundException(error)
    }
    return await this.mouvementsStockService.findOne(id);
  }


  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'MouvementsStock')
  // )
  @MessagePattern({cmd:'update_mouvementsStock'})
  async update(@Payload() updateMouvementsStockDto: UpdateMouvementsStockDto) {
    try {
      return await this.mouvementsStockService.update(updateMouvementsStockDto.id, updateMouvementsStockDto);
    } catch (error) {
      throw new NotFoundException(error)
    }
    
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'MouvementsStock')
  )
  @MessagePattern({cmd:'remove_mouvementsStock'})
  async remove(@Payload() id: number) {
    try {
      return await this.mouvementsStockService.remove(id);
    } catch (error) {
      throw new NotFoundException(error)
    }
    
  }
}
