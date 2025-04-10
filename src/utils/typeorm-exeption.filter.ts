import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorMessage = (exception as any).message;

    if (errorMessage.includes('Duplicate entry')) {
      const match = errorMessage.match(/Duplicate entry '(.+)' for key '(.+)'/);

      if (match) {
        const value = match[1];
        const index = match[2];
        const fieldName = this.extractFieldNameFromIndex(index);

        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: `${fieldName} "${value}" est déjà utilisé.`,
          error: 'Conflit de données',
        });
      }
    }

    // fallback par défaut
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Erreur interne du serveur',
    });
  }

  private extractFieldNameFromIndex(index: string): string {
    // Si tes indexes sont nommés comme 'IDX_<hash>' tu peux personnaliser ici
    // Sinon si tu les nommes explicitement (ex: 'IDX_UNIQUE_TELEPHONE') ça serait plus clair
    const knownIndexes = {
      'IDX_3596ed77c4a09f0654ab638d8e': 'Le numéro de téléphone',
      // Ajoute d'autres correspondances ici
    };

    return knownIndexes[index] ?? 'Une valeur unique';
  }
}
