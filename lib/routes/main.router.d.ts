import express from "express";
import { IController } from "../controllers/controllers.interface";
export declare class App {
    app: express.Application;
    private _port;
    private _excpetionMiddleware;
    constructor(controllers: IController[]);
    listen(): void;
    private initializeMiddlewares;
    private initializeControllers;
    private initializeErrorMiddleware;
    private connectToTheDatabase;
}
