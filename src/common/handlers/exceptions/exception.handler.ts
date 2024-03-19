import { HttpStatus, Logger } from '@nestjs/common';
import { IErrorHandler } from './exception.handler.interface';
import { AuthErrorHandler, BusinessErrorHandler, MongoDBErrorHandler, RedisErrorHandler, ValidationErrorHandler } from './exception-custom.handler';
import { ApiResError } from '../http/response-global.dto';
import { HttpCustom } from '../http/response-temp-error.dto';
import { getLogMessage } from '../logger/logger.util';

export class ExceptionHandler {
  private static logger = new Logger(ExceptionHandler.name);

  private static errorHandlers: IErrorHandler[] = [
    new ValidationErrorHandler(),
    new AuthErrorHandler(),
    new BusinessErrorHandler(),
    new RedisErrorHandler(),
    new MongoDBErrorHandler(),
  ];

  static GetHttpResponse(exception: Error): HttpCustom {
    for (const handler of this.errorHandlers) {
      if (handler.canHandle(exception)) {
        return handler.handle(this.logger, exception);
      }
    }

    // Global Error response
    const apiResponse: ApiResError = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      details: exception.message,
    };
    this.logger.error(getLogMessage(apiResponse.error, apiResponse.statusCode, 'GlobalError'))
    return { body: apiResponse, status: apiResponse.statusCode }
  }
}
