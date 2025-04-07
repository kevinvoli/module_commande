import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Action } from 'src/casl/entities/permission.entity';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}
  
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'produit')
  // )
  @MessagePattern({cmd:'create_produit'})
  async create(@Payload() createProduitDto: CreateProduitDto) {
    return await this.produitService.create(createProduitDto);
  }
  
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'produit')
  // )
  @MessagePattern({cmd:'findAll_produit'})
  async findAll() {
    try {
      console.log('find All');
    
      const resul= await this.produitService.findAll(); 
      console.log(resul);
      return resul
    } catch (error) {
      throw new NotFoundException(error)
    }
    
  }

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'produit')
  // )
  @MessagePattern({cmd:'findOne_produit'})
  async findOne(@Payload() id: number) {
    return this.produitService.findOne(id);
  }

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'produit')
  // )
  @MessagePattern({cmd:'update_produit'})
  async update(@Payload() updateProduitDto: UpdateProduitDto) {
    
    return await this.produitService.update(updateProduitDto.Id, updateProduitDto);
  }

  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(
  //   (ability) => ability.can(Action.Read, 'produit')
  // )
  @MessagePattern({cmd:'remove_produit'})
  async remove(@Payload() id: number) {
    return this.produitService.remove(id);
  } 
}
