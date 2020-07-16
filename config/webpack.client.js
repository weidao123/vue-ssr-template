const BaseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ClientSSRPlugin = require("vue-server-renderer/client-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");
const OptimizerCss = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";

module.exports = merge(BaseConfig, {
    entry: "./entry/client-entry.js",
    output: {
        publicPath: "http://localhost:8080/",
        filename: "js/[hash].js",
    },
    devServer: {
        contentBase: "dist",
        port: 8080,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'}
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
                cache: true,
                exclude: /node_modules/
            }),
            new OptimizerCss(),
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
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [[
                        '@babel/plugin-transform-runtime',
                        { 'corejs': 3 }
                    ]]
                }
            }
        }, {
            test: /\.css$/,
            loader: [isDev ? MiniCssPlugin.loader : MiniCssPlugin.loader, "css-loader", "postcss-loader"],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new MiniCssPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: 'css/[id].[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html",
            minify: {
                removeComments: false
            },
            inject: "body",
            favicon: path.join(__dirname, "../favicon.png")
        }),
        new CleanWebpackPlugin(),
        new ClientSSRPlugin()
    ]
});
