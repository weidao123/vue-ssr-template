const BaseConfig = require("./webpack.base");
const { merge } = require("webpack-merge");
const ClientSSRPlugin = require("vue-server-renderer/client-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizerCss = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = merge(BaseConfig, {
    entry: "./entry/client-entry.js",
    output: {
        publicPath: "/",
        filename: "js/[hash].js",
    },
    devServer: {
        contentBase: "web_dist",
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
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ClientSSRPlugin()
    ]
});
