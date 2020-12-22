import {Autowrite, Controller, render, Req, RequestMapping} from "../../lib";
import {Request} from "express";
import FrontService from "../service/FrontService";
import UserService from "../service/UserService";

const ServerConf = require("../../build/webpack.server");

@Controller()
export default class FrontController {

    @Autowrite()
    private frontService: FrontService;

    @Autowrite()
    private FrontService;

    @Autowrite()
    private user: UserService;

    @RequestMapping({path: "*" })
    public async index(@Req req: Request) {
        return await render(req, ServerConf);
    }
}
