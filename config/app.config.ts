import { LogLevel, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerCustomOptions } from "@nestjs/swagger";
import { ValidationPipe } from "src/common/validation/validation.pipe";

export const isProduction = process.env.NODE_ENV === 'production';
export const logLevels: LogLevel[] = isProduction
    ? ['error', 'warn']
    : ['error', 'warn', 'log', 'verbose', 'debug'];

export const globalPipes = [new ValidationPipe()];

export const showExecutionModeLog = (logger: Logger) => {
    logger.warn(`Running in ${process.env.NODE_ENV} mode`);
};
  
export const showApplicationRunningLog = (logger: Logger) => {
    logger.warn(
        `Application is running on: http://localhost:${process.env.PORT}/api`,
    );
};

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API CULQI PAY')
  .setDescription('API component for technical test for Culqi.')
  .setVersion('1.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'PK',
  )
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  // Custom options if needed
};