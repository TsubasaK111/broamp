'use strict'

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

var nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'source-map',
  // devtool: 'inline-cheap-module-source-map',
  entry: [
    './src/index.js'
  ],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.(mp3|txt|png|jpg|gif|svg)$/,
        include: path.resolve(__dirname, './src'),
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
        },
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    publicPath: '/public'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: false,
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      util: "util",
    },
    extensions: ["*", ".js", ".vue", ".json"],
    // fallback: { "util": require.resolve("util/") }
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  }
}
