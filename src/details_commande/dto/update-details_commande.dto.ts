import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailsCommandeDto } from './create-details_commande.dto';

export class UpdateDetailsCommandeDto extends PartialType(CreateDetailsCommandeDto) {}
