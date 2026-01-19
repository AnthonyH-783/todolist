const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "developement",
    devtool: "inline-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    },
});