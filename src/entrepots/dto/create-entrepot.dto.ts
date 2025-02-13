import { IsNotEmpty, IsString } from "class-validator";

export class CreateEntrepotDto {

    @IsString()
    @IsNotEmpty()
    nom: string;
  
    @IsString()
    @IsNotEmpty()
    adresse: string | null;

}
