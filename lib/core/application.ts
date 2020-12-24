import Loader from "../util/loader";
import ParserDecorate from "../util/parser-decorate";
import {invoke} from "./invoke";
import Logger from "../util/logger";
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
    private readonly starterHandler: StarterHandler;

    constructor() {

        Config.merge();
        const {serviceDir, controllerDir, starterHandlerFile} = Config.getConfig();

        // 加载启动处理器
        const staterHandlerPath = path.resolve(workDir, starterHandlerFile);
        const Handle = Loader.loadFile(Loader.getPathAsExtname(staterHandlerPath));
        this.starterHandler = Handle ? new Handle() : null;

        // 加载controller ｜ service
        const service = Loader.load(path.resolve(workDir, serviceDir));
        const controller = Loader.load(path.resolve(workDir, controllerDir));

        // 解析controller ｜ service
        ParserDecorate.parser(service);
        ParserDecorate.parser(controller);
        ParserDecorate.parserAutowrite();
    }

    public listen() {
        if (this.starterHandler) {
            this.starterHandler.before && this.starterHandler.before(app);
        }
        app.all("*", invoke);
        const port = Config.getConfig().port;
        app.listen(port, () => Logger.info("application running hare http://127.0.0.1:" + port))
    }

}
