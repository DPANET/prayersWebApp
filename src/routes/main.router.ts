import express from "express";
import config from "config";
import morgan from "morgan";
import path from "path";
import * as bodyParser from 'body-parser';
import {IController} from "../controllers/controllers.interface";
import * as prayerController from "../controllers/prayers.controller"
import * as exceptionMiddleware from "../middlewares/exceptions.middleware";

export class App {
  public app: express.Application;
  private _port: number;
  private _excpetionMiddleware:exceptionMiddleware.ExceptionMiddleware;

  constructor(controllers: IController[]) {
    this.app = express();
 
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware()
    this._port = config.get("PORT");
  }
 
  public listen():void {
    this.app.listen(this._port, () => {
      console.log(`App listening on the port ${this._port}`);
    });
  }
 
  private initializeMiddlewares():void {
    this.app.use(bodyParser.json());
    this.app.use(express.static('lib/public'));
    this.app.use(morgan('tiny'));
}
 
  private initializeControllers(controllers: IController[]):void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
  private initializeErrorMiddleware() {
    this._excpetionMiddleware = new exceptionMiddleware.ExceptionMiddleware();
   this.app.use( this._excpetionMiddleware.errorMiddleware);
} 
  private connectToTheDatabase() {

  }
}
 
