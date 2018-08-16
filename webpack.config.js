'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  devtool: 'source-map',
  // devtool: 'inline-cheap-module-source-map',
  entry: [
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {},
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env'],
          plugins: [require('babel-plugin-transform-object-rest-spread')],
        }
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: false,
        compress: false
      }
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  }
}
