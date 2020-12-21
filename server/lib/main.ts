import Loader from "./loader";
import ParserDecorate from "./parser-decorate";
import {invoke} from "./invoke";

const express = require("express");
const app = express();

function bootstrap() {

    const res = Loader.load("D:\\project\\vue-ssr-template\\server\\controller");
    ParserDecorate.parser(res);

    app.use(function (req, res, next) {
        invoke(req, res);
    });

    app.listen(8080, () => console.log("success"));
}

bootstrap();
