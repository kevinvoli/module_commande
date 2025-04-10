import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, HttpStatus, UseFilters } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/casl/entities/permission.entity';
import { TypeOrmRpcExceptionFilter } from 'src/utils/rpc-exception.filter';

@UseFilters(new TypeOrmRpcExceptionFilter())
@Controller('categorie')
@UsePipes(new ValidationPipe({
  whitelist:true,
  exceptionFactory: (errors) =>{
  return new RpcException(errors);
}
}
))
export class CategorieController {
  
  constructor(private readonly categorieService: CategorieService) {}
  

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'categories')
  )
 
  @MessagePattern({cmd:'create_categorie'})
  async create(@Payload() data: CreateCategorieDto) {
    console.log('creation de categorie',data);
    try {
    return await this.categorieService.create(data);
      
    } catch (error) {
      
      throw new Error(error)
    }
  }


  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'categories')
  )
  @MessagePattern({cmd:'findAll_categorie'})
  async findAll() {

    return await this.categorieService.findAll();
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'categories')
  )
  @MessagePattern({cmd:'findOne_categorie'})
  async findOne(@Payload() id: number) {
    try {
    
    return await this.categorieService.findOne(id);
    } catch (error) {
      console.log(error);
      throw new Error(error)
      
    }
    
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'categories')
  )
  @MessagePattern({cmd:'update_categorie'})
  async update(@Payload() updateCategorieDto: UpdateCategorieDto) {
    try {
      console.log("update categorie:",updateCategorieDto);
      const id  = 1
      const result= await this.categorieService.update(updateCategorieDto?.id, updateCategorieDto);
      console.log(result);
      return {result}
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'categorie')
  )
  @MessagePattern({cmd:'remove_categorie'})
  async remove(@Payload() id: number) {
    return await this.categorieService.remove(id);
  } 
}
