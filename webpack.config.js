'use strict'

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  entry: [
    './src/index.js'
  ],
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: false,
        compress: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'IPFS Videostream example',
      template: 'src/index.html'
    })
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
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env'],
          plugins: [require('babel-plugin-transform-object-rest-spread')],
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js'
  }
}
