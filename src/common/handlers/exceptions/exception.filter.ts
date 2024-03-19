import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ExceptionHandler } from "./exception.handler";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response = ExceptionHandler.GetHttpResponse(exception);
    const ctx = host.switchToHttp();
    const responseObj = ctx.getResponse();
    responseObj.status(response.status).json(response.body);
  }
}