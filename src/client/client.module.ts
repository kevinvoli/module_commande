import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from './entities/client.entity';
import { ClientService } from './client.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Clients
     ]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
