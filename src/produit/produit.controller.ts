import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}
  
    @MessagePattern({cmd:'create_produit'})
    create(@Payload() createProduitDto: CreateProduitDto) {
      return this.produitService.create(createProduitDto);
    }
  
    @MessagePattern({cmd:'findAll_produit'})
    async findAll(data?:any) {
      console.log('find All',data);
      
      return await this.produitService.findAll();
    }
  
    @MessagePattern({cmd:'findOne_produit'})
    findOne(@Payload() id: number) {
      return this.produitService.findOne(id);
    }
  
    @MessagePattern({cmd:'update_produit'})
    update(@Payload() updateProduitDto: UpdateProduitDto) {
      return this.produitService.update(updateProduitDto.Id, updateProduitDto);
    }
  
    @MessagePattern({cmd:'remove_produit'})
    remove(@Payload() id: number) {
      return this.produitService.remove(id);
    } 
}
