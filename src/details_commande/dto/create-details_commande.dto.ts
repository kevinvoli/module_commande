import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDetailsCommandeDto {
    @IsNotEmpty()
    @IsInt()
    commandeId: number | null;
  
    @IsNotEmpty()
    @IsInt()
    produitId: number | null;
    @IsNotEmpty()
    @IsInt()
    quantite: number;
    @IsNotEmpty()
    @IsString()
    prixUnitaire: string;

    @IsInt()
    Id: number;
  
}
