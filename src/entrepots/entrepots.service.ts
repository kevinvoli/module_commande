import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntrepotDto } from './dto/create-entrepot.dto';
import { UpdateEntrepotDto } from './dto/update-entrepot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrepots } from './entities/entrepot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntrepotsService {
    constructor(
      @InjectRepository(Entrepots)
      private readonly entrepotsRepository: Repository<Entrepots>
    ){}
async create(createEmprepotDto:CreateEntrepotDto) {
    console.log("la cate",createEmprepotDto);
    
    try {
      const newCategorie= new Entrepots()

      newCategorie.nom = createEmprepotDto.nom
      newCategorie.adresse = createEmprepotDto.adresse

    const categorie = await this.entrepotsRepository.save(newCategorie)
      
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
      const categorie = await this.entrepotsRepository.find({
        relations:{
          rayons:true,

        },
      })
      return categorie
    } catch (error) {
      throw new NotFoundException(error)
    }
   
  }

  async findOne(id: number) {
    try {
      const categorie = await this.entrepotsRepository.findOne({
        where:{id:id}
      })
      return categorie
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: number, updateCategorieDto: UpdateEntrepotDto) {

    try {
      const categorie = await this.entrepotsRepository.findOne({
        where:{id:id}
      })
      if(!categorie) throw new NotFoundException('categorie')
      Object.assign(categorie, updateCategorieDto)
      return await this.entrepotsRepository.save(categorie)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async remove(id: number) {
    try {
      const categorie = await this.entrepotsRepository.findOne({
        where: {id}
      });
      if(!categorie) throw new NotFoundException('user' );
  
      await this.entrepotsRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
