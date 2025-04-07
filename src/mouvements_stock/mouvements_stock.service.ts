import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMouvementsStockDto } from './dto/create-mouvements_stock.dto';
import { UpdateMouvementsStockDto } from './dto/update-mouvements_stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MouvementsStock } from './entities/mouvements_stock.entity';

@Injectable()
export class MouvementsStockService {
  constructor(
        @InjectRepository(MouvementsStock)
        private readonly entrepotsRepository: Repository<MouvementsStock>
      ){}
  async create(createMouvementsStockServiceDto:CreateMouvementsStockDto) {
      console.log("la cate",createMouvementsStockServiceDto);
      
      try {
        const newCategorie= new MouvementsStock()
  
        newCategorie.typeMouvement = createMouvementsStockServiceDto.typeMouvement
        newCategorie.quantite = createMouvementsStockServiceDto.quantite
        newCategorie.date = createMouvementsStockServiceDto.date
        newCategorie.rangementId = createMouvementsStockServiceDto.rangementId
        newCategorie.produitId = createMouvementsStockServiceDto.produitId

  
      const categorie = await this.entrepotsRepository.save(newCategorie)
        
        return categorie
      } catch (error) {
        console.log("creater",error);
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
            produit:true,
            rangement:true
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
  
    async update(id: number, updateCategorieDto: UpdateMouvementsStockDto) {
  
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
