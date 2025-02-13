import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRayonDto {
    @IsNotEmpty()
    @IsString()
    nom: string;
    
    @IsNotEmpty()
    @IsInt()
    entrepotId: number | null;
}
