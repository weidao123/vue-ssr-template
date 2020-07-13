const BaseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ClientSSRPlugin = require("vue-server-renderer/client-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");

module.exports = merge(BaseConfig, {
    entry: "./entry/client-entry.js",
    output: {
        filename: "js/[name].[hash].js",
    },
    devServer: {
        contentBase: "dist",
        port: 8080,
        hot: true
    },
    performance: {
        maxEntrypointSize: 1024 * 1000,
        maxAssetSize: 1024 * 1000
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                parallel: true,
                cache: true
            }),
        ],
        splitChunks: {
            name: 'vendor',
            minSize: 1024 * 100,
            maxSize: 1024 * 100,
            minChunks: 1
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader: [MiniCssPlugin.loader, "css-loader"],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new MiniCssPlugin({
            filename: "css/[name].[hash].js",
            chunkFilename: 'css/[id].[name].[hash].css'
        }),
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
