import {
  ArgumentsHost,
  Catch,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmRpcExceptionFilter implements RpcExceptionFilter<QueryFailedError> {
  catch(exception: QueryFailedError, host: ArgumentsHost): Observable<any> {
    const message = (exception as any).message;
    console.log("message:", message);
    
    if (message.includes('Duplicate entry')) {
      const match = message.match(/Duplicate entry '(.+)' for key '(.+)'/);
      if (match) {
        const value = match[1];
        return throwError(() => new RpcException({
          statusCode: 409,
          message: `La valeur "${value}" est déjà utilisée.`,
        }));
      }
    }

    return throwError(() => new RpcException({
      statusCode: 500,
      message: 'Erreur interne',
    }));
  }
}
