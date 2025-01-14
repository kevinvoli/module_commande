import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategorieDto {

  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsString()
  description: string | null;

  
  @IsInt()
  parentId: number | null;

  @IsNumber()
  Id:number
 
  
}
