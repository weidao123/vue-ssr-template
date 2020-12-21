const express = require("express");
const WebpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");

const ClientConf = require("../config/webpack.client");
const {isDev} = require("./util");
const { port } = require("./config");
const router = require("./router");
const front = require("./controller/front");

const Server = express();

// 根目录渲染
Server.use( (req, res, next) => req.path === "/" ? front.renderPage(req, res) : next());

// 静态资源
Server.use(express.static(ClientConf.output.path));

// 开发环境编译客户端程序
if (isDev()) Server.use(WebpackDevMiddleware(webpack(ClientConf)));

// 路由挂载
router(Server);
Server.listen(port, () => console.log("> http://localhost:" + port));
