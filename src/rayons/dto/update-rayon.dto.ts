import { PartialType } from '@nestjs/mapped-types';
import { CreateRayonDto } from './create-rayon.dto';

export class UpdateRayonDto extends PartialType(CreateRayonDto) {
  id: number;
}
