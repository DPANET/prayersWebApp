import express from "express";
import { IController } from "../controllers/controllers.interface";
declare class App {
    app: express.Application;
    private _port;
    constructor(controllers: IController[]);
    listen(): void;
    private initializeMiddlewares;
    private initializeControllers;
    private connectToTheDatabase;
}
export default App;
