import * as express from 'express';
import * as val from '../validators/validations';
import valiadtors = val.validators;
export declare const enum ParameterType {
    query = 0,
    body = 1
}
export declare class ValidationMiddleware {
    constructor();
    validationMiddleware<T>(prameterType: ParameterType, validator: valiadtors.IValid<T>): express.RequestHandler;
}
