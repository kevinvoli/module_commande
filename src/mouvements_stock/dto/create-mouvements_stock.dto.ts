import { IsString, isString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export enum typeMouvement {
  entree= "entrée",
  sortie = "sortie"
}

export class CreateMouvementsStockDto {

    @IsString()
    @IsNotEmpty()
    typeMouvement:typeMouvement ;
  
    @IsNotEmpty()
    @IsInt()
    quantite: number;
  
    @IsDateString()
    @IsNotEmpty()
    date: Date | null;
  
    @IsString()
    @IsNotEmpty()
    rangementId: number | null;
  

    @IsNotEmpty()
    @IsInt()
    produitId: number;

}
