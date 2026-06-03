import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;
    const stack = exception.stack;
    const timestamp = Date.now().toLocaleString();

    this.logger.error(
      `[${timestamp}] [ERROR] status: ${status}, message: ${message}, stack: ${stack}`,
    );

    response.status(status).json({
      success: false,
      status,
      message,
    });
  }
}
