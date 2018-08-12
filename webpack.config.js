'use strict'

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
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
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: [require('babel-plugin-transform-object-rest-spread')],
          }
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js'
  }
}
