import { BusinessError } from '../../domain/exceptions/business.exception';
import { MongoDBError } from '../../domain/exceptions/mongodb.exception';
import { IErrorHandler } from './exception.handler.interface';
import { HttpCustom } from '../http/response-temp-error.dto';
import { RequestValidationError } from 'src/common/domain/exceptions/validation.exception';
import { Logger } from '@nestjs/common';
import { getLogMessage } from '../logger/logger.util';
import { AuthError } from 'src/common/domain/exceptions/auth.exception';
import { RedisError } from 'src/common/domain/exceptions/redis.exception';

export class ValidationErrorHandler implements IErrorHandler {
    canHandle(exception: Error): boolean {
        return exception instanceof RequestValidationError;
    }

    handle(logger: Logger, exception: RequestValidationError): HttpCustom {
        logger.error(
            getLogMessage(
                exception.message,
                exception.getStatus(),
                RequestValidationError.name,
            ),
        );
        return { body: exception.getResponse(), status: exception.getStatus() };
    }
}

export class AuthErrorHandler implements IErrorHandler {
    canHandle(exception: Error): boolean {
        return exception instanceof AuthError;
    }

    handle(logger: Logger, exception: MongoDBError): HttpCustom {
        logger.error(
            getLogMessage(
                exception.message,
                exception.getStatus(),
                MongoDBError.name,
            ),
        );
        return { body: exception.getResponse(), status: exception.getStatus() };
    }
}

export class BusinessErrorHandler implements IErrorHandler {
    canHandle(exception: Error): boolean {
        return exception instanceof BusinessError;
    }

    handle(logger: Logger, exception: BusinessError): HttpCustom {
        logger.error(
            getLogMessage(
                exception.message,
                exception.getStatus(),
                BusinessError.name,
            ),
        );
        return { body: exception.getResponse(), status: exception.getStatus() };
    }
}

export class RedisErrorHandler implements IErrorHandler {
    canHandle(exception: Error): boolean {
        return exception instanceof RedisError;
    }

    handle(logger: Logger, exception: RedisError): HttpCustom {
        logger.error(
            getLogMessage(
                exception.message,
                exception.getStatus(),
                RedisError.name,
            ),
        );
        return { body: exception.getResponse(), status: exception.getStatus() };
    }
}

export class MongoDBErrorHandler implements IErrorHandler {
    canHandle(exception: Error): boolean {
        return exception instanceof MongoDBError;
    }

    handle(logger: Logger, exception: MongoDBError): HttpCustom {
        logger.error(
            getLogMessage(
                exception.message,
                exception.getStatus(),
                MongoDBError.name,
            ),
        );
        return { body: exception.getResponse(), status: exception.getStatus() };
    }
}
