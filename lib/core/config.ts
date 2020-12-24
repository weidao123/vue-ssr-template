import {Request, Response, NextFunction, Application} from "express";
import Loader from "../util/loader";

const path = require("path");

export interface ErrorHandler {
    errorHandler(req: Request, res: Response, next?: NextFunction);
    notFoundHandler(req: Request, res: Response, next?: NextFunction);
}

export interface StarterHandler {
    before?(app: Application): void;
}

export class Config {

    private static conf: Config = new Config();

    public static getConfig() {
        return this.conf;
    }

    public static merge() {
        // 加载默认的配置文件
        const confPath = path.resolve(process.cwd(), Config.conf.configFile);
        const conf = Loader.loadFile(Loader.getPathAsExtname(confPath)) || {};
        Object.assign(Config.conf, conf);
    }

    public port?: number = 8080;

    // 所有的目录都是相对于项目根目录
    public controllerDir?: string = "app/controller";
    public clientOutputDir?: string = "dist";
    public serviceDir?: string = "app/service";
    public logDir?: string = "logs";

    // 文件 会优先加载 ts文件 后加载js文件
    public configFile?: string = "app/config/config";
    public entryFile?: string = "app/application";
    public starterHandlerFile?: string = "app/config/starter-handler";

    public ssrTemplate?: string = "index.html";

}
