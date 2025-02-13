import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRayonDto } from './dto/create-rayon.dto';
import { UpdateRayonDto } from './dto/update-rayon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rayons } from './entities/rayon.entity';
import { EntrepotsService } from 'src/entrepots/entrepots.service';

@Injectable()
export class RayonsService {
  constructor(
            @InjectRepository(Rayons)
            private readonly entrepotsRepository: Repository<Rayons>,
            private readonly entrepotsService : EntrepotsService
            
      ){}
  async create(createMouvementsStockServiceDto:CreateRayonDto) {
      console.log("la cate",createMouvementsStockServiceDto);
      
      try {
        const entrepots = await this.entrepotsService.findOne(createMouvementsStockServiceDto.entrepotId) 
        const newCategorie= new Rayons()
        newCategorie.nom = createMouvementsStockServiceDto.nom
        newCategorie.entrepot = entrepots
  
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
            entrepot:true
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
  
    async update(id: number, updateCategorieDto: UpdateRayonDto) {
  
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
