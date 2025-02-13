import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslAbilityFactory } from './casl-ability.factory';
import { EntityLoader } from './entity-loader.service';
import { Permissions } from './entities/permission.entity';
import { Roles } from './entities/roles.entity';



@Module({
  imports: [
      TypeOrmModule.forFeature([Roles,Permissions]),
    
    ],
   controllers: [
     
    ],
    providers: [
      CaslAbilityFactory,
      EntityLoader,
    ],
})
export class CaslModule {}