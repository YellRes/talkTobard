import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const status = exception.getStatus();
    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    this.httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
