import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorieDto } from './create-categorie.dto';
import { IsInt } from 'class-validator';

export class UpdateCategorieDto extends PartialType(CreateCategorieDto) {
  @IsInt()
  id?:number
}
