import { IController } from '../controllers/controllers.interface.js';
export declare class AuthenticationController implements IController {
    path: string;
    router: import("express-serve-static-core").Router;
    private user;
    private _validationController;
    private _validateUser;
    constructor();
    private initializeRoutes;
    private initalizeValidators;
    private validateUserRequest;
    private registration;
    private loggingIn;
}
