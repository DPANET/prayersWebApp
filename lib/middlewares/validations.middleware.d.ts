import * as express from 'express';
export declare class ValidationMiddleware {
    constructor();
    validationMiddleware<T>(type: any): express.RequestHandler;
}
