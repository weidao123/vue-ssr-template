const {merge} = require("webpack-merge");
const BaseConfig = require("./webpack.base");
const path = require("path");
const ServerSSRPlugin = require("vue-server-renderer/server-plugin");
const WebpackNodeExternals = require("webpack-node-externals");

module.exports = merge(BaseConfig, {
    target: "node",
    entry: path.join(__dirname, "../entry/server-entry.js"),
    output: {
        libraryTarget: "commonjs2"
    },
    externals: [new WebpackNodeExternals({
        allowlist: [/\.css$/]
    })],
    plugins: [
        new ServerSSRPlugin()
    ]
});
