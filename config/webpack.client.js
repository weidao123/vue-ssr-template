const BaseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ClientSSRPlugin = require("vue-server-renderer/client-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = merge(BaseConfig, {
    entry: "./entry/client-entry.js",
    devServer: {
        contentBase: "dist",
        port: 8080,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html",
            minify: {
                removeComments: false
            }
        }),
        new CleanWebpackPlugin(),
        new ClientSSRPlugin()
    ]
});
