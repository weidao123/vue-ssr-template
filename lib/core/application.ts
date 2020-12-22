import Loader from "../util/loader";
import ParserDecorate from "../util/parser-decorate";
import {invoke} from "./invoke";
import Logger from "../util/logger";
import {Application as ExpressApplication} from "express";
import {Config} from "./config";

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
export default abstract class Application {

    // 全局配置
    public static config: Config = new Config();

    protected constructor() {

        // 加载默认的配置文件
        const confTs = path.resolve(workDir, Application.config.configFile + ".ts");
        const confJs = path.resolve(workDir, Application.config.configFile + ".js");
        const conf = (Loader.loadFile(confTs) || Loader.loadFile(confJs)) || {};
        Application.config = Application.config.merge(conf);

        // 加载controller ｜ service
        const service = Loader.load(path.resolve(workDir, Application.config.serviceDir));
        const controller = Loader.load(path.resolve(workDir, Application.config.controllerDir));

        // 解析controller ｜ service
        ParserDecorate.parser(service);
        ParserDecorate.parser(controller);
        ParserDecorate.parserAutowrite();
    }

    public async start() {
        const port = Application.config.port;
        await this.before && this.before(app);
        app.all("*", invoke);
        app.listen(port, () => Logger.info("application running hare http://127.0.0.1:" + port))
    }

    abstract before(app: ExpressApplication);
}
