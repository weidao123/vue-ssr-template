import {Controller, Get, render, Req} from "summer-boot";
import {Request} from "express";

const ServerConf = require("../../build/webpack.server");

@Controller()
export default class FrontController {

    /**
     * front是vue设置的base router 为了不和其他服务端接口冲突
     * front下的所有路由 都当作vue路由
     */
    @Get("/front/(.*)")
    public async index(@Req req: Request) {
        return await render(req, ServerConf);
    }
}
