import * as express from 'express';
import * as exceptionHandler from '../exceptions/exception.handler';
import * as val from '@dpanet/prayers-lib/lib/validators/validator'
import valiadtor = val.validators;
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