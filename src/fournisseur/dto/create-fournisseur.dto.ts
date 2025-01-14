import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFournisseurDto {
    @IsNotEmpty()
    @IsString()
    nom: string;
    @IsNotEmpty()
    @IsString()
    adresse: string | null;
    @IsNotEmpty()
    @IsString()
    contact: string | null;

    @IsNumber()
    Id: number;
  

}
