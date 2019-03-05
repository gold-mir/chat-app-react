const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

let config = {
  target: "node",
  entry: './src/server/server.js',
  node: {
    __dirname: false
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['js']
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: [/node_modules/, /spec/, /dist/],
      //   loader: 'eslint-loader',
      //   enforce: "pre"
      // },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /spec/, /dist/],
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", {
              targets: {
                node: "current"
              }
            }]
          ]
        }
      }
    ]
  },
  externals: [nodeExternals()]
};

module.exports = config;