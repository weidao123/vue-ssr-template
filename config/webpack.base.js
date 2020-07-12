const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode: "development",
    performance: {
        maxEntrypointSize: 1024 * 1000,
        maxAssetSize: 1024 * 1000
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            minSize: 1024 * 100,
            maxSize: 1024 * 100,
            minChunks: 1
        }
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "js/[name].[hash].js",
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: "vue-loader"
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
