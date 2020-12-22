import {Request, Response, NextFunction} from "express";

export interface ErrorHandler {
    errorHandler(req: Request, res: Response, next?: NextFunction);
    notFoundHandler(req: Request, res: Response, next?: NextFunction);
}
