import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categorie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categories)
    private readonly categorieRepository: Repository<Categories>
  ){

  }
  async create(createCategorieDto:Partial<CreateCategorieDto>) {
    console.log("la cate",createCategorieDto);
    
    try {
      const newCategorie= new Categories()
      if(createCategorieDto.parentId){
        const parentCategory= await this.categorieRepository.findOne({
          where:{id:createCategorieDto.parentId}
        })
      newCategorie.parent = parentCategory
      }
      newCategorie.nom= createCategorieDto.nom
      const categorie = await this.categorieRepository.save(newCategorie)
      
      return categorie
    } catch (error) {
      console.log(error.code);
      if(error.code =="ER_DUP_ENTRY"){
        throw new HttpException('ce nom existe déjà',HttpStatus.BAD_REQUEST)
      }
      throw error
      
    }
  }

  async findAll() {

    try {
      const categorie = await this.categorieRepository.find({
        relations:{
          categories:true,
          parent:true
        },
      })
      return categorie
    } catch (error) {
      throw new NotFoundException(error)
    }
   
  }

  async findOne(id: number) {
    try {
      const categorie = await this.categorieRepository.findOne({
        where:{id:id}
      })
      return categorie
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: number, updateCategorieDto: UpdateCategorieDto) {

    try {
      const categorie = await this.categorieRepository.findOne({
        where:{id:id}
      })
      if(!categorie) throw new NotFoundException('categorie')
      Object.assign(categorie, updateCategorieDto)
      return await this.categorieRepository.save(categorie)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async remove(id: number) {
    try {
      const categorie = await this.categorieRepository.findOne({
        where: {id}
      });
      if(!categorie) throw new NotFoundException('user' );
  
      await this.categorieRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
