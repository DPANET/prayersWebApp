import  bcrypt from 'bcrypt';
import  express from 'express';
import {UserWithThatEmailAlreadyExistsException,WrongCredentialsException} from '../exceptions/exception.handler';
import {IController} from '../controllers/controllers.interface';
import {ValidationMiddleware} from '../middlewares/validations.middleware';
import * as validationController from "../middlewares/validations.middleware"
import * as validators from "../validators/validations";
import {userModel} from '../users/users.model';
import {IUser} from "../users/users.interface"
import * as sentry from "@sentry/node";
export class AuthenticationController implements IController {

  public path = '/auth';
  public router = express.Router();
  private user = userModel;
  private _validationController: ValidationMiddleware;
  private _validateUser: Function;
  constructor() {
    this.initializeRoutes();
    this.initalizeValidators();
  }
 
  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.validateUserRequest, this.registration);
    this.router.post(`${this.path}/login`,this.validateUserRequest, this.loggingIn);
  }
  private initalizeValidators() {
    this._validateUser = this._validationController.validationMiddlewareByRequest
    .bind(this, validators.UserValidator.createValidator(), validationController.ParameterType.body);

    }

  private validateUserRequest = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      try {
          let fn: express.RequestHandler = this._validateUser(request.body.user);
          fn(request, response, next);
      }
      catch (err) {
         // debug(err);
          sentry.captureException(err);
          next(new WrongCredentialsException());
      }
  }
  private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: IUser = request.body;
    if (
      await this.user.findOne({ email: userData.email })
    ) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.password = undefined;
      response.send(user);
    }
  }
 
  private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData: IUser = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = undefined;
        response.send(user);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  }
}
 
