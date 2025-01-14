import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produits } from './entities/produit.entity';
import { CategorieService } from 'src/categorie/categorie.service';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produits)
    private readonly produitRepository: Repository<Produits>,
    private readonly categorieService : CategorieService
  ){  }
  async create(createProduitDto: CreateProduitDto) {
    

     try {
      const categorie = await this.categorieService.findOne(createProduitDto.categorieId) 
      const article= new Produits()
      article.nom= createProduitDto.nom;
      article.categorie= categorie;
      article.description = createProduitDto.description
      article.stockActuel=createProduitDto.stockActuel
      article.seuilAlerte=createProduitDto.seuilAlerte

      

      
      const ligne = await this.produitRepository.save(article)
      console.log("ddd ",ligne);

      return ligne
    } catch (error) {
      throw new HttpException("echec de la creation de l'article", HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {
    try {
      const ligne = await this.produitRepository.find({
        relations:{
          categorie:true
        }
      })
      return {ligne:ligne, data:'les data'}
    } catch (error) {
      throw new HttpException("echec de la creation de article", HttpStatus.NOT_FOUND)

    }
  }

  async findOne(artcileId:number) {
    try {
      const ligne = await this.produitRepository.findOne({  where: {
        id:artcileId,
      }})
      return ligne
    } catch (error) {
      throw new HttpException("echec de la creation de panier", HttpStatus.NOT_FOUND)
    }
  }

  async findOneByPanier(artcileId:number) {
    try {
      const ligne = await this.produitRepository.findOne({  where: {
        id:artcileId,
      }})
      return ligne
    } catch (error) {
      throw new HttpException("echec de la creation de panier", HttpStatus.NOT_FOUND)
    }
  }



  async findOneById(artcileId:number){
try {
      const ligne = await this.produitRepository.findOne({  where: {
       id:artcileId
      }})
      return ligne
    } catch (error) {
      throw new HttpException("echec de la creation de panier", HttpStatus.NOT_FOUND)
    }
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    try {
      const ligne = await this.produitRepository.findOne({
        where:{id:id}
      })
      if(!ligne) throw new NotFoundException('ligne')
      Object.assign(ligne, updateProduitDto)
      return await this.produitRepository.save(ligne)
    } catch (error) {
      throw new HttpException("echec de la creation de panier", HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      const ligne = await this.produitRepository.findOne({
        where: {id}
      });
      if(!ligne) throw new NotFoundException('ligne' );
  
      await this.produitRepository.delete({id});
      return true
    } catch (error) {
      throw new HttpException("echec de la creation de panier", HttpStatus.BAD_REQUEST)

    }
  }
}
