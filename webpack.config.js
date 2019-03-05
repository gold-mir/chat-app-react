const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let clientConfig = {
  target: "web",
  entry: './src/client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/public')
  },
  resolve:{
    extensions: ['.js', '.jsx']
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist/public',
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
        options: {
          presets: [
            "@babel/preset-react",
            ["@babel/preset-env", {
              useBuiltIns: "usage",
              debug: true,
              targets: "> 0.5% in US, not ie <= 9"
            }]
          ]
        }
      }
    ]
  }
}


module.exports = clientConfig;
