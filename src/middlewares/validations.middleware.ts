import * as express from 'express';
import * as exceptionHandler from '../exceptions/exception.handler';

export class ValidationMiddleware
{
    constructor()
    {        
    }

    validationMiddleware<T>(type:any): express.RequestHandler
    {
        return;
    }
}