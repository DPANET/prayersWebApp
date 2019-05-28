const dotenv = require('dotenv').config();
const debug = require('debug')('app:router');
import * as express from 'express';
import * as exceptionHandler from '../exceptions/exception.handler';
import * as val from '../validators/validations';
import valiadtors = val.validators;
import { validators } from '../validators/validations';
import * as sentry from "@sentry/node";
sentry.init({ dsn:process.env.DSN  });
export const enum ParameterType
{
    query=0,
    body
}
export class ValidationMiddleware {
    constructor() {
    }

    validationMiddleware<T>(prameterType:ParameterType,validator: valiadtors.IValid<T>): express.RequestHandler {
        let result: boolean = false;
        let err: validators.IValidationError;
        let message: string[];
        let object:any ;
        return (req, res, next) => {
            if(prameterType===ParameterType.body)
                object = req.body;
            else
                object= req.query;
            debug(object);
            result = validator.validate(object);
        
            switch (result) {
                case true:
                    next();
                    break;
                case false:
                    err = validator.getValidationError();
                    if (err.name === "ValidationError")
                        message = err.details.map((detail: any) => `${detail.value.label} with value ${detail.value.value}: ${detail.message}`);
                    debug(message);
                    sentry.captureException(err);
                    next(new exceptionHandler.HttpException(400, message.reduce((prvs, curr) => prvs.concat('\r\n', curr))));
                    break;
            }
        }
    }
}