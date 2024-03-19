import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/handlers/exceptions/exception.filter';
import { Logger } from '@nestjs/common';
import { globalPipes, showApplicationRunningLog, showExecutionModeLog, swaggerConfig, swaggerCustomOptions } from 'config/app.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');
  showExecutionModeLog(logger);

  app.useGlobalPipes(...globalPipes);
  app.useGlobalFilters(new GlobalExceptionFilter());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, swaggerCustomOptions);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), '0.0.0.0');
  showApplicationRunningLog(logger);
}
bootstrap();
