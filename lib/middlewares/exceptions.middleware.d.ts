import { NextFunction, Request, Response } from 'express';
import * as exceptionHandler from '../exceptions/exception.handler';
export declare class ExceptionMiddleware {
    constructor();
    exceptionMiddleware(error: exceptionHandler.HttpException, request: Request, response: Response, next: NextFunction): void;
}
