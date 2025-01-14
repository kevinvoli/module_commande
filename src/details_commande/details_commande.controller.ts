import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailsCommandeService } from './details_commande.service';
import { CreateDetailsCommandeDto } from './dto/create-details_commande.dto';
import { UpdateDetailsCommandeDto } from './dto/update-details_commande.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('details-commande')
export class DetailsCommandeController {
  constructor(private readonly detailsCommandeService: DetailsCommandeService) {}

  @MessagePattern({cmd:'create_details-commande'})
  create(@Payload() createDetailsCommandeDto: CreateDetailsCommandeDto) {
    return this.detailsCommandeService.create(createDetailsCommandeDto);
  }

  @MessagePattern({cmd:'findAll_details-commande'})
  findAll() {
    console.log('find All');
    
    return this.detailsCommandeService.findAll();
  }

  @MessagePattern({cmd:'findOne_details-commande'})
  findOne(@Payload() id: number) {
    return this.detailsCommandeService.findOne(id);
  }

  @MessagePattern({cmd:'update_details-commande'})
  update(@Payload() updateDetailsCommandeDto: UpdateDetailsCommandeDto) {
    return this.detailsCommandeService.update(updateDetailsCommandeDto.Id, updateDetailsCommandeDto);
  }

  @MessagePattern({cmd:'remove_details-commande'})
  remove(@Payload() id: number) {
    return this.detailsCommandeService.remove(id);
  } 
}
