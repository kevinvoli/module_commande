import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @MessagePattern({cmd:'create_client'})
  create(@Payload() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @MessagePattern({cmd:'findAll_client'})
  findAll() {
    console.log('find All');
    
    return this.clientService.findAll();
  }

  @MessagePattern({cmd:'findOne_client'})
  findOne(@Payload() id: number) {
    return this.clientService.findOne(id);
  }

  @MessagePattern({cmd:'update_client'})
  update(@Payload() updateClientDto: UpdateClientDto) {
    return this.clientService.update(updateClientDto.Id, updateClientDto);
  }

  @MessagePattern({cmd:'remove_client'})
  remove(@Payload() id: number) {
    return this.clientService.remove(id);
  } 
}
