import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class CreateCommandeDto {

    @IsNotEmpty()
    @IsString()
    typeCommande: "achat" | "vente" | null;
  
    @IsNotEmpty()
    date: Date | null;
  
    @IsString()
    statut: string | null;

    
    @IsInt()
    clientId: number | null;

    @IsInt()
    Id: number | null;
    
    @IsInt()
    fournisseurId: number | null;
  
}
