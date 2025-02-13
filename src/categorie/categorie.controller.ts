import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { Action } from 'src/casl/entities/permission.entity';

@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}
  

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'categorie')
  )
  @MessagePattern({cmd:'create_categorie'})
  async create(@Payload() createCategorieDto: CreateCategorieDto) {
    console.log('creation de categorie', CreateCategorieDto);
    
    return await this.categorieService.create(createCategorieDto);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'categorie')
  )
  @MessagePattern({cmd:'findAll_categorie'})
  async findAll() {
    console.log('find All');
    return await this.categorieService.findAll();
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'categorie')
  )
  @MessagePattern({cmd:'findOne_categorie'})
  async findOne(@Payload() id: number) {
    return await this.categorieService.findOne(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'categorie')
  )
  @MessagePattern({cmd:'update_categorie'})
  async update(@Payload() updateCategorieDto: UpdateCategorieDto) {
    return await this.categorieService.update(updateCategorieDto.Id, updateCategorieDto);
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
