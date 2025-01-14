import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fournisseurs } from './entities/fournisseur.entity';

@Injectable()
export class FournisseurService {
   constructor(
      @InjectRepository(Fournisseurs)
      private readonly fournisseurRepository: Repository<Fournisseurs>,

        
    ){  }
    async create(createFournisseurDto: CreateFournisseurDto) {
  
       try {
       
        const newDatail= new Fournisseurs()
        newDatail.nom=createFournisseurDto.nom
        newDatail.adresse = createFournisseurDto.adresse
        newDatail.contact = createFournisseurDto.contact
  
        const ligne = await this.fournisseurRepository.save(newDatail)
        return ligne
      } catch (error) {
        throw new ConflictException(error)
      }
    }
  
    async findAll() {
      try {
        const datail = await this.fournisseurRepository.find()
        return datail
      } catch (error) {
        throw new NotFoundException(error)
      }
    }
  
    async findOne(id: number) {
      try {
        const datail = await this.fournisseurRepository.findOne({
          where:{id:id}
        })
        return datail
      } catch (error) {
        throw new NotFoundException(error)
      }
    }
  
    async update(id: number, updateFournisseurDto: UpdateFournisseurDto) {
      try {
        const datail = await this.fournisseurRepository.findOne({
          where:{id:id}
        })
        if(!datail) throw new NotFoundException('ligne')
        Object.assign(datail, updateFournisseurDto)
        return await this.fournisseurRepository.save(datail)
      } catch (error) {
        throw new NotFoundException(error)
      }
    }
  
    async remove(id: number) {
      try {
        const datail = await this.fournisseurRepository.findOne({
          where: {id}
        });
        if(!datail) throw new NotFoundException('ligne' );
    
        await this.fournisseurRepository.delete({id});
        return true
      } catch (error) {
        throw new NotFoundException(error)
      }
    }
}
