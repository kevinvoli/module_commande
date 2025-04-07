import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/casl/entities/permission.entity';

@Controller('categorie')
@UsePipes(new ValidationPipe({
  // transform: true, // Cela transforme les objets bruts en instances de DTO
  whitelist: true, // Cela supprime les propriétés non définies dans le DTO
  exceptionFactory: (errors) =>{
  console.log(errors);
 
  return new RpcException(errors);
  
}}))
export class CategorieController {
  
  constructor(private readonly categorieService: CategorieService) {}
  

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'categorie')
  // )
 
  @MessagePattern({cmd:'create_categorie'})
  async create(@Payload() data: CreateCategorieDto) {
    console.log('creation de categorie');
    try {
    return await this.categorieService.create(data);
      
    } catch (error) {
      console.log("les errue",error);
      
      throw new Error(error)
    }
  }


  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'categorie')
  // )
  @MessagePattern({cmd:'findAll_categorie'})
  async findAll() {

    return await this.categorieService.findAll();
  }

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'categorie')
  // )
  @MessagePattern({cmd:'findOne_categorie'})
  async findOne(@Payload() id: number) {
    try {
 
    
    return await this.categorieService.findOne(id);
    } catch (error) {
      console.log(error);
      throw new Error(error)
      
    }
    
  }

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'categorie')
  // )
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
