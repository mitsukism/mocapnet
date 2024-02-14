const path = require("path")
module.exports = {
    entry: {
        background_scripts: "./background.js",
        popup: "./popup.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]/index.js"
    },
    mode: 'development',
    devtool: 'source-map', // or 'inline-source-map', 'cheap-source-map', etc.
}
