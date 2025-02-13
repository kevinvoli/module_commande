import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateRangementDto {
    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    @IsInt()
    rayon: number;
}
