"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv').config();
const debug = require('debug')('app:router');
const exceptionHandler = __importStar(require("../exceptions/exception.handler"));
class ValidationMiddleware {
    constructor() {
    }
    validationMiddleware(validator) {
        let result = false;
        let err;
        let message;
        return (req, res, next) => {
            result = validator.validate(req.query);
            switch (result) {
                case true:
                    next();
                    break;
                case false:
                    err = validator.getValidationError();
                    if (err.name === "ValidationError")
                        message = err.details.map((detail) => `${detail.value.label} with value ${detail.value.value}: ${detail.message}`);
                    debug(message);
                    next(new exceptionHandler.HttpException(400, message.reduce((prvs, curr) => prvs.concat('\r\n', curr))));
                    break;
            }
        };
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validations.middleware.js.map