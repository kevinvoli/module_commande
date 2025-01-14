import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}
  
  @MessagePattern({cmd:'create_categorie'})
  async create(@Payload() createCategorieDto: CreateCategorieDto) {
    console.log('creation de categorie', CreateCategorieDto);
    
    return await this.categorieService.create(createCategorieDto);
  }

  @MessagePattern({cmd:'findAll_categorie'})
  async findAll() {
    console.log('find All');
    return await this.categorieService.findAll();
  }

  @MessagePattern({cmd:'findOne_categorie'})
  async findOne(@Payload() id: number) {
    return await this.categorieService.findOne(id);
  }

  @MessagePattern({cmd:'update_categorie'})
  async update(@Payload() updateCategorieDto: UpdateCategorieDto) {
    return await this.categorieService.update(updateCategorieDto.Id, updateCategorieDto);
  }

  @MessagePattern({cmd:'remove_categorie'})
  async remove(@Payload() id: number) {
    return await this.categorieService.remove(id);
  } 
}
