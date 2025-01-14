import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('fournisseur')
export class FournisseurController {
  constructor(private readonly fournisseurService: FournisseurService) {}

  @MessagePattern({cmd:'create_fournisseur'})
  create(@Payload() createFournisseurDto: CreateFournisseurDto) {
    return this.fournisseurService.create(createFournisseurDto);
  }

  @MessagePattern({cmd:'findAll_fournisseur'})
  findAll() {
    console.log('find All');
    
    return this.fournisseurService.findAll();
  }

  @MessagePattern({cmd:'findOne_fournisseur'})
  findOne(@Payload() id: number) {
    return this.fournisseurService.findOne(id);
  }

  @MessagePattern({cmd:'update_fournisseur'})
  update(@Payload() updateFournisseurDto: UpdateFournisseurDto) {
    return this.fournisseurService.update(updateFournisseurDto.Id, updateFournisseurDto);
  }

  @MessagePattern({cmd:'remove_fournisseur'})
  remove(@Payload() id: number) {
    return this.fournisseurService.remove(id);
  } 
}
