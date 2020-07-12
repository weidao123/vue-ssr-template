const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const path = require("path");
const MiniCssPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    performance: {
        maxEntrypointSize: 1024 * 1000,
        maxAssetSize: 1024 * 1000
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "js/[name].[hash].js",
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader"
        }, {
            test: /\.css$/,
            loader: ["style-loader", "css-loader"],
            exclude: /node_modules/
        }]
    },
    devtool: "eval-source-map",
    resolve: {
        extensions: [".vue", ".js"]
    },
    plugins: [
        new webpack.DefinePlugin({
            "processNode": "'node'"
        }),
        new VueLoaderPlugin()
    ]
}
