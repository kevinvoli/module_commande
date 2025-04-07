import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRangementDto } from './dto/create-rangement.dto';
import { UpdateRangementDto } from './dto/update-rangement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rangements } from './entities/rangement.entity';
import { Repository } from 'typeorm';
import { RayonsService } from 'src/rayons/rayons.service';

@Injectable()
export class RangementsService {
  constructor(
          @InjectRepository(Rangements)
          private readonly entrepotsRepository: Repository<Rangements>,
          private readonly rayonService : RayonsService
          
    ){}
async create(createMouvementsStockServiceDto:CreateRangementDto) {
    console.log("la cate",createMouvementsStockServiceDto);
    
    try {
      const rayon = await this.rayonService.findOne(createMouvementsStockServiceDto.rayonId) 
      const newCategorie= new Rangements()

      newCategorie.nom = createMouvementsStockServiceDto.nom
      newCategorie.rayon = rayon

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
          rayon:true          
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

  async update(id: number, updateCategorieDto: UpdateRangementDto) {

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
