import {Autowrite, Controller, Get, PathVariable, render, Req, RequestMapping} from "summer-boot";
import {Request} from "express";
import FrontService from "../service/FrontService";
import UserService from "../service/UserService";

const ServerConf = require("../../build/webpack.server");

@Controller({ path: "/" })
export default class FrontController {

    @Autowrite()
    private frontService: FrontService;

    @Autowrite()
    private FrontService;

    @Autowrite()
    private user: UserService;

    @RequestMapping("/")
    public async home(@Req req: Request) {
        return await render(req, ServerConf);
    }

    @Get("/front/(.*)")
    public async index(@Req req: Request) {
        return await render(req, ServerConf);
    }

    @Get("/list")
    public async list(@Req req: Request) {
        return this.frontService.getName();
    }

    @Get("/list/:id/:cc")
    public async list1(@Req req: Request, @PathVariable('id') id, @PathVariable('cc') cc) {
        return {id, cc};
    }
}
