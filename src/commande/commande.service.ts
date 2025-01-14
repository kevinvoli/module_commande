import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commandes } from './entities/commande.entity';
import { Repository } from 'typeorm';
import { ClientService } from 'src/client/client.service';
import { FournisseurService } from 'src/fournisseur/fournisseur.service';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commandes)
    private readonly commandeRepository: Repository<Commandes>,
    private readonly clientService: ClientService,
    private readonly fournisseurService: FournisseurService,

  ){  }

  async handleMessage(message: any) {
    console.log('Message reçu dans commendeServcie:', message);
    return { message: 'Réponse du commendeServcie', data: message };
  }
  
  async create(createCommandeDto: CreateCommandeDto ) {

     try {
      const client= await this.clientService.findOne(createCommandeDto.clientId)
      const fournisseur= await this.fournisseurService.findOne(createCommandeDto.fournisseurId)

        const newCommande= new Commandes()
        newCommande.client= client
        newCommande.date= createCommandeDto.date
        newCommande.fournisseur= fournisseur
        newCommande.typeCommande= createCommandeDto.typeCommande
        newCommande.statut= createCommandeDto.statut
        
        
        const commande = await this.commandeRepository.save(newCommande)
        const succes= await this.commandeRepository.findOne({where:{id:commande.id},relations:{
          client:true,
          fournisseur:true
        
        }})
        return commande
         
    } catch (error) {
      throw new ConflictException(error)
    }
  }

  async findAll() {
    try {
      const commande = await this.commandeRepository.find({
        relations:{
          client:true,
          fournisseur:true,
          detailsCommandes:true,

        }
      })
      return commande
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findAllCommandeClient(clientId:number) {
    try {
      const commande = await this.commandeRepository.find({where:{
        client:{id:clientId} 
      },
      relations:{
        detailsCommandes:true,
        client:true,
        fournisseur:true,
      }
      })
      return commande
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findAllCommandeFournisseur(fournissuerId:number) {
    try {
      const commande = await this.commandeRepository.find({where:{
        fournisseur:{id:fournissuerId} 
      },
        relations:{
          detailsCommandes:true,
          client:true,
          fournisseur:true,
        }
      })
      return commande
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: number) {
    try {
      const commande = await this.commandeRepository.findOne({
        where:{id:id},
        relations:{
          detailsCommandes:true,
          client:true,
          fournisseur:true,
        }
      })
      return commande
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: number, updateCommandeDto: UpdateCommandeDto) {
    try {
      const commande = await this.commandeRepository.findOne({
        where:{id:id},
      })
      if(!commande) throw new NotFoundException('commande')
      Object.assign(commande, updateCommandeDto)
      return await this.commandeRepository.save(commande)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
  async remove(id: number) {
    try {
      const commande = await this.commandeRepository.findOne({
        where: {id}
      });
      if(!commande) throw new NotFoundException('commande' );
  
      await this.commandeRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async addAddress(id: number, updateCommandeDto: UpdateCommandeDto) {
    try {
      const commande = await this.commandeRepository.findOne({
        where:{id:id}
      })
      if(!commande) throw new NotFoundException('commande')
      Object.assign(commande, updateCommandeDto)
      return await this.commandeRepository.save(commande)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
  
}
