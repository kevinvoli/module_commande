import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Clients)
    private readonly clientRepository: Repository<Clients>
  ){
  }

  async create(createClientDto: CreateClientDto) {
    try {

      const newMatier= new Clients()
      newMatier.nom= createClientDto.nom
      newMatier.contact = createClientDto.contact
      newMatier.adresse = createClientDto.adresse

      const matiere = await this.clientRepository.save(newMatier)
      return matiere
    } catch (error) {
      throw new HttpException("cette couleur existe deja", 400,error)
    }
  }

  async findAll() {
    try {
      const matiere = await this.clientRepository.find({
        relations:{
          commandes:true
        }
      })
      return matiere
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: number) {
    try {
      const matiere = await this.clientRepository.findOne({
        where:{id:id}
      })
      return matiere
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      const matiere = await this.clientRepository.findOne({
        where:{id:id}
      })
      if(!matiere) throw new NotFoundException('createur')
      Object.assign(matiere, updateClientDto)
      return await this.clientRepository.save(matiere)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async remove(id: number) {
    try {
      const matiere = await this.clientRepository.findOne({
        where: {id}
      });
      if(!matiere) throw new NotFoundException('user' );
  
      await this.clientRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
