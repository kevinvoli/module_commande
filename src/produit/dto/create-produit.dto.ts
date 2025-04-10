import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProduitDto {
   
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
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
  @IsOptional()
  Id: number
  
}
