import { Logger } from "@nestjs/common";
import { HttpCustom } from "../http/response-temp-error.dto";

export interface IErrorHandler {
    handle(logger: Logger, exception: Error): HttpCustom;
    canHandle(exception: Error): boolean;
}
  