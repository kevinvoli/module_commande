import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import axios from 'axios';


const serviceName = 'ServiceStock';
  const host = '127.0.0.1';
  const port = 3001;
  const protocole= 'tcp';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: port, // Port pour ce microservice
    },
  });
  // Enregistrer ce service auprès du Gateway
  try {
    await axios.post('http://127.0.0.1:3003/discovery/register', {
      nom: serviceName,
      host: host,
      port:port.toString(),
      protocole:protocole,
      cleApi:'zertyuioouyjtrgefzdertyu'
    });
    console.log(`${serviceName} enregistré auprès du Gateway`);
  } catch (error) {
    console.error('Erreur lors de l’enregistrement auprès du Gateway', error.message);
  }
  
  // const app = await NestFactory.create(AppModule);
  await app.listen();
  console.log('Microservice Stock is running on port 3001');

}
bootstrap();
