const ClientConf = require("../../config/webpack.client");
const {isDev} = require("./index");
const path = require("path");
const {get} = require("axios");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");

const { serverBundleName, clientBundleName, port } = require("../config");
const ServerConf = require("../../config/webpack.server");

/**
 * 客户端bundle
 */
exports.getClientBundle = async () => {
    if (isDev()) {
        const { data } = await get("http://localhost:"+ port +"/" + clientBundleName);
        return data;
    }
    return require(path.join(ClientConf.output.path, clientBundleName));
};

/**
 * 服务端bundle 从内存获取 bundle
 * @param callback
 */
exports.getServerBundle = function (callback) {
    const compiler = webpack(ServerConf);
    const name = serverBundleName;

    return new Promise(function (resolve) {
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
            resolve(JSON.parse(bundle));
            callback && callback(JSON.parse(bundle));
        });
    })
};
