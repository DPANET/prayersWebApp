import bcrypt from 'bcrypt';
import express from 'express';
import { UserWithThatEmailAlreadyExistsException, WrongCredentialsException } from '../exceptions/exception.handler.js';
import * as validators from "../validators/validations.js";
import { userModel } from '../users/users.model.js';
import * as sentry from "@sentry/node";
export class AuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = express.Router();
        this.user = userModel;
        this.validateUserRequest = async (request, response, next) => {
            try {
                let fn = this._validateUser(request.body.user);
                fn(request, response, next);
            }
            catch (err) {
                // debug(err);
                sentry.captureException(err);
                next(new WrongCredentialsException());
            }
        };
        this.registration = async (request, response, next) => {
            const userData = request.body;
            if (await this.user.findOne({ email: userData.email })) {
                next(new UserWithThatEmailAlreadyExistsException(userData.email));
            }
            else {
                const hashedPassword = await bcrypt.hash(userData.password, 10);
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
                const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
                if (isPasswordMatching) {
                    user.password = undefined;
                    response.send(user);
                }
                else {
                    next(new WrongCredentialsException());
                }
            }
            else {
                next(new WrongCredentialsException());
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
//# sourceMappingURL=authentication.controller.js.map