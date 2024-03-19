import { HttpStatus } from "@nestjs/common";
import { ApiResError } from "../../handlers/http/response-global.dto";

export class RedisError extends Error {
    private responseObj: ApiResError;
    private httpStatusCode: number;
  
    constructor(msg: string, httpStatus?: number) {
      super(msg);
      Object.setPrototypeOf(this, RedisError.prototype);
      this.httpStatusCode = httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR;
      this.responseObj = {
        statusCode: this.httpStatusCode,
        error: 'Redis Error',
        details: msg
      };
    }
  
    getStatus(): number {
      return this.httpStatusCode;
    }
  
    getResponse(): ApiResError {
      return this.responseObj;
    }
  }