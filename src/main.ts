import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import axios from 'axios';
import * as net from 'net';
import * as os from 'os'
import { ValidationPipe } from '@nestjs/common';



function getLocalIPAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address; // Retourne la première adresse IPv4 non interne
      }
    }
  }
  return '127.0.0.1'; // Adresse de repli si aucune adresse n'est trouvée
}




async function bootstrap() {
  const host = getLocalIPAddress()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: host,
      port: 3001, // Port pour ce microservice
    },
  });
  const serviceName = 'ServiceStock';
  const port = '3001';
  // Enregistrer ce service auprès du Gateway
  try {
    await axios.post('http://127.0.0.1:3003/discovery/register', {
      nom: serviceName,
      host: host,
      port:port,
      protocole:'tcp',
      cleApi:'zertyuioouyjtrgefzdertyu'
    });
    console.log(`${serviceName} enregistré auprès du Gateway`);
  } catch (error) {
    console.error('Erreur lors de l’enregistrement auprès du Gateway', error.message);
  }
  
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist:true
  // }));
   
  app.listen();
  console.log('Microservice Stock is running on port 3001');

}
bootstrap();
