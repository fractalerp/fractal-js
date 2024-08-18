const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: "./server.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main-app.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
        ]
    },
    mode: "development",
    devtool: "source-map"
};
