import {StarterHandler, Env, render} from "summer-boot";

const express = require("express");
const WebpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const ServerConf = require("../build/webpack.server");
const ClientConf = require("../build/webpack.client");

export default class ApplicationHandler implements StarterHandler {
    public before(app): void {

        // 对根目录做单独处理
        app.use(async function (req, res, next) {
            if (req.path === "/") {
                const html = await render(req, ServerConf);
                res.send(html)
            } else {
                next();
            }
        });

        // 开发环境编译客户端程序
        if (Env.isDevelopment) {
            app.use(WebpackDevMiddleware(webpack(ClientConf)));
        }
        // 静态资源
        app.use(express.static(ClientConf.output.path));
    }

    public after(app) {
    }
}
