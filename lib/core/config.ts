import {Request, Response, NextFunction} from "express";

export interface ErrorHandler {
    errorHandler(req: Request, res: Response, next?: NextFunction);
    notFoundHandler(req: Request, res: Response, next?: NextFunction);
}

export class Config {
    public port?: number = 8080;
    public controllerDir?: string = "app/controller";
    public serviceDir?: string = "app/service";
    public ssrTemplate?: string = "index.html";
    public clientOutputDir?: string = "dist";

    public merge?(conf: Config): Config {
        Object.assign(this, conf);
        return this;
    }
}
