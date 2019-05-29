import * as express from 'express';
import * as validators from '../validators/validations';
export declare const enum ParameterType {
    query = 0,
    body = 1
}
export declare class ValidationMiddleware {
    constructor();
    validationMiddlewareByRequest<T>(prameterType: ParameterType, validator: validators.IValid<T>): express.RequestHandler;
    validationMiddlewareByObject<T>(validObject: T, validator: validators.IValid<T>): express.RequestHandler;
}
