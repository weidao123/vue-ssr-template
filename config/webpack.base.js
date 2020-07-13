const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode: "development",
    output: {
        path: path.join(__dirname, "../dist"),
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader"
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
