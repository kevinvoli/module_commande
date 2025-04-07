import { IsEmpty, isInt, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCategorieDto {

  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsString()
  description: string | null;
 
  @IsInt()
  parentId: number|null ;
  
}
