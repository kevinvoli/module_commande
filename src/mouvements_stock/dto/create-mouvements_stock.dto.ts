import { Type } from 'class-transformer';
import { IsString, isString, IsNotEmpty, IsDateString, IsInt, IsEnum } from 'class-validator';

export enum typeMouvement {
  entree= "entrée",
  sortie = "sortie"
}

export class CreateMouvementsStockDto {

    @IsEnum(typeMouvement)
    @IsNotEmpty()
    typeMouvement:typeMouvement ;
  
    @IsNotEmpty()
    @IsInt()
    quantite: number;
  
    @IsDateString()
    @IsNotEmpty()
    @Type(()=>Date)
    date: Date ;
  
    @IsString()
    @IsInt()
    rangementId: number;
  

    @IsNotEmpty()
    @IsInt()
    produitId: number;

}
