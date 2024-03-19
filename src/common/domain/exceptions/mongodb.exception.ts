import { HttpStatus } from "@nestjs/common";
import { ApiResError } from "../../handlers/http/response-global.dto";

export class MongoDBError extends Error {
    private responseObj: ApiResError;
    private httpStatusCode: number;
  
    constructor(msg: string, httpStatus?: number) {
      super(msg);
      Object.setPrototypeOf(this, MongoDBError.prototype);
      this.httpStatusCode = httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR;
      this.responseObj = {
        statusCode: this.httpStatusCode,
        error: 'MongoDB Error',
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