import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DetailsCommandes } from "./entities/details_commande.entity"
import { Repository } from "typeorm"
import { UpdateDetailsCommandeDto } from "./dto/update-details_commande.dto"
// import { ProduitService } from "src/produit/produit.service"
import { CommandeService } from "src/commande/commande.service"
import { ProduitService } from "src/produit/produit.service"
import { CreateDetailsCommandeDto } from "./dto/create-details_commande.dto"


@Injectable()
export class DetailsCommandeService {
  constructor(
    @InjectRepository(DetailsCommandes)
    private readonly ligneRepository: Repository<DetailsCommandes>,
    private readonly produitService: ProduitService,
    private readonly commandeService: CommandeService,

  ){  }
  async create(createDetailsCommandeDto: CreateDetailsCommandeDto) {

     try {
      const produit = await this.produitService.findOne(createDetailsCommandeDto.produitId)
      const commande = await this.commandeService.findOne(createDetailsCommandeDto.commandeId)
      const newDatail= new DetailsCommandes()
      newDatail.commande=commande
      newDatail.prixUnitaire = createDetailsCommandeDto.prixUnitaire
      newDatail.produit = produit
      newDatail.quantite = createDetailsCommandeDto.quantite

      const ligne = await this.ligneRepository.save(newDatail)
      return ligne
    } catch (error) {
      throw new ConflictException(error)
    }
  }

  async findAll() {
    try {
      const datail = await this.ligneRepository.find()
      return datail
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(id: number) {
    try {
      const datail = await this.ligneRepository.findOne({
        where:{id:id}
      })
      return datail
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async update(id: number, updateDetailsCommandeDto: UpdateDetailsCommandeDto) {
    try {
      const datail = await this.ligneRepository.findOne({
        where:{id:id}
      })
      if(!datail) throw new NotFoundException('ligne')
      Object.assign(datail, UpdateDetailsCommandeDto)
      return await this.ligneRepository.save(datail)
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async remove(id: number) {
    try {
      const datail = await this.ligneRepository.findOne({
        where: {id}
      });
      if(!datail) throw new NotFoundException('ligne' );
  
      await this.ligneRepository.delete({id});
      return true
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
