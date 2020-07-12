const Webpack = require("webpack");
const ServerConf = require("./webpack.server");
const ClientConf = require("./webpack.client");
const MemoryFs = require("memory-fs");
const path = require("path");
const express = require("express");
const fs = require("fs");
const WebpackDevMiddleware = require("webpack-dev-middleware");
const {get} = require("axios");

const SERVER_BUNDLE_NAME = "vue-ssr-server-bundle.json";
const CLIENT_BUNDLE_NAME = "vue-ssr-client-manifest.json";
const TEMPLATE_PATH = path.join(__dirname, "../index.html");
const BundleCache = {};
const SERVER_PORT = ClientConf.devServer && ClientConf.devServer.port || 8088;
exports.SERVER_PORT = SERVER_PORT;

/**
 * 从内存获取 bundle
 * @param compiler
 * @param name
 */
function createBundle(compiler, name) {
    return new Promise(function (resolve, reject) {
        const mf = new MemoryFs();
        compiler.outputFileSystem = mf;
        compiler.watch({},  (err, status) => {
            if (err) {
                console.log(err);
                return;
            }
            status = status.toJson();
            status.errors.forEach((e) => console.log(e));
            status.warnings.forEach((war) => console.log(war));
            const serverBundlePath = path.join(
                ServerConf.output.path,
                name
            );
            const bundle = mf.readFileSync(serverBundlePath, "utf-8");
            resolve(bundle);
        });
    })
}

/**
 * 初始化服务，生成bundle 并且缓存
 * @param Server
 * @param mode
 * @return {Promise<void>}
 */
async function initClientServer(Server, mode = "development") {

    if (Object.keys(BundleCache).length >= 3) {
        return;
    }
    if (mode === "production") {
        const output = ClientConf.output.path;
        Server.use(express.static(output));
        BundleCache[TEMPLATE_PATH] = fs.readFileSync(path.join(output, "index.html"), "utf-8");
        BundleCache[SERVER_BUNDLE_NAME] = require(path.join(output, SERVER_BUNDLE_NAME));
        BundleCache[CLIENT_BUNDLE_NAME] = require(path.join(output, CLIENT_BUNDLE_NAME));
        return;
    }

    if (BundleCache[CLIENT_BUNDLE_NAME]) {
        return;
    }
    const ClientCompiler = Webpack(ClientConf);
    const ServerCompiler = Webpack(ServerConf);
    Server.use(WebpackDevMiddleware(ClientCompiler));
    const {data} = await get("http://localhost:"+ SERVER_PORT +"/" + CLIENT_BUNDLE_NAME);
    BundleCache[CLIENT_BUNDLE_NAME] = data;
    const jsonStr = await createBundle(ServerCompiler, SERVER_BUNDLE_NAME);
    BundleCache[SERVER_BUNDLE_NAME] = JSON.parse(jsonStr);
    BundleCache[TEMPLATE_PATH] = fs.readFileSync(TEMPLATE_PATH, "utf-8");
}

function getBundle () {
    return {
        serverBundle: BundleCache[SERVER_BUNDLE_NAME],
        template: BundleCache[TEMPLATE_PATH],
        clientBundle: BundleCache[CLIENT_BUNDLE_NAME]
    }
}

exports.getBundle = getBundle;
exports.initClientServer = initClientServer;
exports.createBundle = createBundle;
