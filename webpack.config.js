const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  plugins: [new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
    algorithm: 'gzip',
    minRatio: 0.8,
  })],
  entry: path.join(__dirname + '/client/index.jsx'),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"]}
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"]},
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
};