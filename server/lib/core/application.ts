import Loader from "../util/loader";
import ParserDecorate from "../util/parser-decorate";
import {invoke} from "./invoke";
import Logger from "../util/logger";
import {Application as ExpressApplication} from "express";

const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default abstract class Application {

    public controllerPath: string = "server/controller";

    protected constructor() {
        const con = Loader.load(path.resolve(process.cwd(), this.controllerPath));
        ParserDecorate.parser(con);
    }

    public async start(port: number = 8080) {
        await this.before(app);
        app.all("*", invoke);
        app.listen(port, () => Logger.info("application running hear http://127.0.0.1:" + port))
    }

    abstract before(app: ExpressApplication);
}
