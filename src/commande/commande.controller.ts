import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

    @MessagePattern({cmd:'create_commande'})
    create(@Payload() createCommandeDto: CreateCommandeDto) {
      return this.commandeService.create(createCommandeDto);
    }
  
    @MessagePattern({cmd:'findAll_commande'})
    findAll() {
      console.log('find All');
      
      return this.commandeService.findAll();
    }
  
    @MessagePattern({cmd:'findOne_commande'})
    findOne(@Payload() id: number) {
      return this.commandeService.findOne(id);
    }
  
    @MessagePattern({cmd:'update_commande'})
    update(@Payload() updateCommandeDto: UpdateCommandeDto) {
      return this.commandeService.update(updateCommandeDto.Id, updateCommandeDto);
    }
  
    @MessagePattern({cmd:'remove_commande'})
    remove(@Payload() id: number) {
      return this.commandeService.remove(id);
    } 
}
