import Loader from "../util/loader";
import ParserDecorate from "../util/parser-decorate";
import {invoke} from "./invoke";
import Logger from "../util/logger";
import {Application as ExpressApplication} from "express";
import {Config, StarterHandler} from "./config";

const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");

const app = express();
const workDir = process.cwd();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * 用于初始化一些数据 以及对外提供抽象生命周期方法
 */
export default class Application {

    // 全局配置
    public static config: Config = new Config();
    private starterHandler: StarterHandler;

    constructor() {

    }

    public init() {
        // 加载默认的配置文件
        const confPath = path.resolve(workDir, Application.config.configFile);
        const conf = Loader.loadFile(Loader.getPathAsExtname(confPath)) || {};
        Application.config = Application.config.merge(conf);

        // 加载启动处理器
        const staterHandlerPath = path.resolve(workDir, Application.config.starterHandlerFile);
        const Handle = Loader.loadFile(Loader.getPathAsExtname(staterHandlerPath));
        this.starterHandler = Handle ? new Handle() : null;

        // 加载controller ｜ service
        const service = Loader.load(path.resolve(workDir, Application.config.serviceDir));
        const controller = Loader.load(path.resolve(workDir, Application.config.controllerDir));

        // 解析controller ｜ service
        ParserDecorate.parser(service);
        ParserDecorate.parser(controller);
        ParserDecorate.parserAutowrite();

        if (this.starterHandler) {
            this.starterHandler.before && this.starterHandler.before(app);
        }
    }

    public link() {
        app.all("*", invoke);
    }

    public listen() {
        const port = Application.config.port;
        app.listen(port, () => Logger.info("application running hare http://127.0.0.1:" + port))
    }

}
