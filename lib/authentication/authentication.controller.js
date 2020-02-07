"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const exception_handler_1 = require("../exceptions/exception.handler");
const validators = __importStar(require("../validators/validations"));
const users_model_1 = require("../users/users.model");
const sentry = __importStar(require("@sentry/node"));
class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express_1.default.Router();
        this.user = users_model_1.userModel;
        this.validateUserRequest = async (request, response, next) => {
            try {
                let fn = this._validateUser(request.body.user);
                fn(request, response, next);
            }
            catch (err) {
                // debug(err);
                sentry.captureException(err);
                next(new exception_handler_1.WrongCredentialsException());
            }
        };
        this.registration = async (request, response, next) => {
            const userData = request.body;
            if (await this.user.findOne({ email: userData.email })) {
                next(new exception_handler_1.UserWithThatEmailAlreadyExistsException(userData.email));
            }
            else {
                const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
                const user = await this.user.create({
                    ...userData,
                    password: hashedPassword,
                });
                user.password = undefined;
                response.send(user);
            }
        };
        this.loggingIn = async (request, response, next) => {
            const logInData = request.body;
            const user = await this.user.findOne({ email: logInData.email });
            if (user) {
                const isPasswordMatching = await bcrypt_1.default.compare(logInData.password, user.password);
                if (isPasswordMatching) {
                    user.password = undefined;
                    response.send(user);
                }
                else {
                    next(new exception_handler_1.WrongCredentialsException());
                }
            }
            else {
                next(new exception_handler_1.WrongCredentialsException());
            }
        };
        this.initializeRoutes();
        this.initalizeValidators();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.validateUserRequest, this.registration);
        this.router.post(`${this.path}/login`, this.validateUserRequest, this.loggingIn);
    }
    initalizeValidators() {
        this._validateUser = this._validationController.validationMiddlewareByRequest
            .bind(this, validators.UserValidator.createValidator(), 1 /* body */);
    }
}
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map