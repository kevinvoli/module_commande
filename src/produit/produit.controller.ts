import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Action } from 'src/casl/entities/permission.entity';
import { CheckPolicies } from 'src/casl/decorators/policies.decorator';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';

@Controller('produit')
@UsePipes(new ValidationPipe({
  whitelist:true,
  exceptionFactory: (errors) =>{
  return new RpcException(errors);}})
)
@UseGuards(PoliciesGuard) 
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}
  
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'produits'),
    (ability) => ability.can(Action.Create, 'produits')
  )
  @MessagePattern({cmd:'create_produit'})
  async create(@Payload() createProduitDto: CreateProduitDto) {
    return await this.produitService.create(createProduitDto);
  }
  
  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'produits')
  )
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

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'produits')
  )
  @MessagePattern({cmd:'findOne_produit'})
  async findOne(@Payload() data: number) {
    return this.produitService.findOne(data);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'produits'),
    (ability) => ability.can(Action.Update, 'produits')

  )
  @MessagePattern({cmd:'update_produit'})
  async update(@Payload() updateProduitDto: UpdateProduitDto) {
    
    return await this.produitService.update(updateProduitDto.Id, updateProduitDto);
  }

  @CheckPolicies(
    (ability) => ability.can(Action.Read, 'produits'),
    (ability) => ability.can(Action.Delete, 'produits')

  )
  @MessagePattern({cmd:'remove_produit'})
  async remove(@Payload() data: number) {
    return this.produitService.remove(data);
  } 
}
