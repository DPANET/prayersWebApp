import IController from "./controllers.interface";
import express from 'express';
import path from 'path';
export default class MainController implements IController
{

    path: string;
    router: express.Router;
    constructor()
    {
        this.path = "/";
        this.router= express.Router();
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(this.path, this.mainPageRoute);
      }
    private mainPageRoute=  (request: express.Request, response: express.Response)=>
    {
        response.sendFile(path.join(__dirname,"../index.html"));
    }

}