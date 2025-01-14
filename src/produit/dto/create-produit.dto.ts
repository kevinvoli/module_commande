import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProduitDto {
   
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  description: string | null;

  @IsNotEmpty()
  @IsInt()
  categorieId: number | null;

  @IsNumber()
  @IsNotEmpty()
  stockActuel: number;

  @IsNumber()
  @IsNotEmpty()
  seuilAlerte: number;

  @IsNumber()
  Id: number
  
}
