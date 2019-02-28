const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve:{
    extensions: ['.js', '.jsx']
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    host: "localhost",
    port: 8081,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Template',
      template: './src/client/index.html',
      inject: 'body'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /spec/, /dist/],
        loader: "eslint-loader",
        enforce: "pre"
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /spec/],
        loader: "babel-loader",
      }
    ]
  }
};
