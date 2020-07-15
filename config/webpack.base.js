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
