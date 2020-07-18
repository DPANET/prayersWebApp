import config from 'nconf';
const debug = require('debug')('app:router');
import * as exceptionHandler from '../exceptions/exception.handler.js';
import * as sentry from "@sentry/node";
sentry.init({ dsn: config.get("DSN") });
export class ValidationMiddleware {
    constructor() {
    }
    validationMiddlewareByRequest(validator, prameterType) {
        let result = false;
        let err;
        let message;
        let object;
        return (req, res, next) => {
            if (prameterType === 1 /* body */)
                object = req.body;
            else
                object = req.query;
            debug(`validation the following object: ${object}`);
            result = validator.validate(object);
            switch (result) {
                case true:
                    next();
                    break;
                case false:
                    err = validator.getValidationError();
                    if (err.name === "ValidationError")
                        message = err.details.map((detail) => `${detail.value.label} with value ${detail.value.value}: ${detail.message}`);
                    debug(message);
                    sentry.captureException(err);
                    next(new exceptionHandler.HttpException(400, message.reduce((prvs, curr) => prvs.concat('\r\n', curr))));
                    break;
            }
        };
    }
    validationMiddlewareByObject(validator, validObject) {
        let result = false;
        let err;
        let message;
        return (req, res, next) => {
            result = validator.validate(validObject);
            debug(`object Validation Result is ${result} for ${validObject} `);
            switch (result) {
                case true:
                    next();
                    break;
                case false:
                    err = validator.getValidationError();
                    if (err.name === "ValidationError")
                        message = err.details.map((detail) => `${detail.value.label} with value ${detail.value.value}: ${detail.message}`);
                    debug(message);
                    sentry.captureException(err);
                    next(new exceptionHandler.HttpException(400, message.reduce((prvs, curr) => prvs.concat('\r\n', curr))));
                    break;
            }
        };
    }
}
//# sourceMappingURL=validations.middleware.js.map