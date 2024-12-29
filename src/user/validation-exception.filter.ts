import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError[], host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    console.log('aa');
    

    // Remove 'author.' from validation error messages
    const transformedErrors = exception.map((error) => {
      if (error.constraints) {
        error.constraints = Object.fromEntries(
          Object.entries(error.constraints).map(([key, message]) => [
            key,
            message.replace('author.', ''),
          ])
        );
      }
      return error;
    });

    // Send the transformed error message as the response
    response.status(400).json({
      statusCode: 400,
      message: 'Validation failed',
      errors: transformedErrors,
    });
  }
}
