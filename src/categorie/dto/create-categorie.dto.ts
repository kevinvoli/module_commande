import { IsEmpty, isInt, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategorieDto {

  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsString()
  @IsOptional()
  description: string | null;
 

  @IsInt()
  @IsOptional()
  parentId: number;
  
}
