import {Controller, render, Req, RequestMapping} from "../lib";
import {Request} from "express";

const ServerConf = require("../../config/webpack.server");

@Controller()
export default class FrontController {

    @RequestMapping({path: "*" })
    public async index(@Req req: Request) {
        return await render(req, ServerConf);
    }
}
