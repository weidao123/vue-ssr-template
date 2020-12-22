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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default abstract class Application {

    public static config: Config = new Config();

    protected constructor(config?: Config) {

        if (config) {
            Application.config = Application.config.merge(config);
        }

        const con = Loader.load(path.resolve(process.cwd(), Application.config.controllerPath));
        ParserDecorate.parser(con);
    }

    public async start() {
        const port = Application.config.port;
        await this.before(app);
        app.all("*", invoke);
        app.listen(port, () => Logger.info("application running hear http://127.0.0.1:" + port))
    }

    abstract before(app: ExpressApplication);
}
