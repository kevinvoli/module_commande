import { PartialType } from '@nestjs/mapped-types';
import { CreateRangementDto } from './create-rangement.dto';

export class UpdateRangementDto extends PartialType(CreateRangementDto) {
  id: number;
}
