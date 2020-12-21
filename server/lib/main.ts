import Loader from "./loader";
import ParserDecorate from "./parser-decorate";
import {invoke} from "./invoke";

const path = require("path");
const express = require("express");
const app = express();

function bootstrap() {

    const res = Loader.load(path.resolve(process.cwd(), "server/controller"));
    ParserDecorate.parser(res);

    app.all("*", function (req, res, next) {
        invoke(req, res);
    });

    app.listen(8080, () => console.log("success"));
}

bootstrap();
