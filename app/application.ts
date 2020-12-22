import Application from "../lib";

const express = require("express");
const WebpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");

const ClientConf = require("../build/webpack.client");
const isDev = process.env.NODE_ENV === "development";

class App extends Application {

    constructor() {
        super();
    }

    public before(app) {

        // 开发环境编译客户端程序
        if (isDev) {
            app.use(WebpackDevMiddleware(webpack(ClientConf)));
        }

        // 静态资源
        app.use(express.static(ClientConf.output.path));

    }
}

export default App;
