const {merge} = require("webpack-merge");
const BaseConfig = require("./webpack.base");
const path = require("path");
const ServerSSRPlugin = require("vue-server-renderer/server-plugin");
const WebpackNodeExternals = require("webpack-node-externals");
const MiniCssPlugin = require("mini-css-extract-plugin");

module.exports = merge(BaseConfig, {
    target: "node",
    entry: path.join(__dirname, "../entry/server-entry.js"),
    output: {
        libraryTarget: "commonjs2",
        filename: "server-entry.js"
    },
    optimization: {
        splitChunks: false
    },
    externals: [new WebpackNodeExternals({
        allowlist: [/\.css$/]
    })],
    module: {
        rules: [{
            test: /\.css$/,
            loader: [MiniCssPlugin.loader, "css-loader"],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new MiniCssPlugin(),
        new ServerSSRPlugin()
    ]
});
