const express = require("express");
const ServerRender = require("vue-server-renderer");
const ServerConf = require("./webpack.server");
const ClientConf = require("./webpack.client");
const {createBundle, SERVER_BUNDLE_NAME, CLIENT_BUNDLE_NAME, SERVER_PORT } = require("./utils");
const Server = express();
const webpack = require("webpack");
const {get} = require("axios");
const fs = require("fs");
const path = require("path");

/**
 * 开发环境 服务
 */
(async function () {
    Server.listen(SERVER_PORT, () => {
        console.log("> start server\r\n");
        console.log("> running at development env\r\n");
        console.log("> application running here http://localhost:" + SERVER_PORT);
    });
    const ServerCompiler = webpack(ServerConf);
    let serverBundle;
    await createBundle(ServerCompiler, SERVER_BUNDLE_NAME, function (newBundle) {
        serverBundle = newBundle;
        console.log("change page");
    });
    Server.get("*", async function (req, res, next) {
        const {data} = await get("http://localhost:"+ ClientConf.devServer.port +"/" + CLIENT_BUNDLE_NAME);
        const clientBundle = data;
        const template = fs.readFileSync(path.join(__dirname, "../index.html"), "utf-8");
        if (!clientBundle
            || clientBundle.all.includes(req.url.substring(1))
            || clientBundle.all.includes(req.url)
        ) {
            console.log(req.url);
            next();
            return;
        }
        if (!serverBundle) {
            res.send("webpack 正在编译中。。。。");
        }
        try {
            const renderer = ServerRender.createBundleRenderer(serverBundle, {
                clientManifest: clientBundle,
                template,
                runInNewContext: false,
                inject: true
            });
            const html = await renderer.renderToString({url: req.url});
            res.end(html);
        } catch (e) {
            console.log("=======error=======");
            console.log(e);
            res.send(e.toString());
        }
    });
})();
