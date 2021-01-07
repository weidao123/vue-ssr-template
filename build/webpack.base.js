const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const path = require("path");
const MiniCssPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

function cssLoader () {
    return [isDev ? "vue-style-loader" : MiniCssPlugin.loader, "css-loader", "postcss-loader"];
}

module.exports = {
    mode: "development",
    output: {
        path: path.join(__dirname, "../web_dist"),
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader"
        },  {
            test: /\.(jpg|png|gif|jpeg)$/,
            use: {
                loader: "url-loader",
                options: {
                    esModule: false,
                    limit: 1024 * 10,
                    outputPath: 'images',
                    name: '[name].[hash:8].[ext]'
                }
            }
        }, {
            test: /\.css$/,
            loader: cssLoader(),
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: [...cssLoader(), "less-loader"],
            exclude: /node_modules/
        },{
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
            test: /\.ts$/,
            loader: ['ts-loader'],
            exclude: /node_modules/,
        }]
    },
    devtool: "eval-source-map",
    resolve: {
        extensions: [".vue", ".js"]
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
            // favicon: path.join(__dirname, "../favicon.png")
        }),
        new webpack.DefinePlugin({
            "processNode": "'node'"
        }),
        new VueLoaderPlugin()
    ]
}
