import * as express from 'express';
import * as val from '../validators/validations';
import valiadtors = val.validators;
export declare class ValidationMiddleware {
    constructor();
    validationMiddleware<T>(validator: valiadtors.IValid<T>): express.RequestHandler;
}
