const path = require('path');

const ExtractCSSPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const extractStyles = new ExtractCSSPlugin({
  filename: "styles.css"
});

const dir = path.resolve(__dirname, "./TodoApp");

const stats = {
  assets: false,
  children: false,
  version: false,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
};

module.exports = {
  mode: 'development',
  entry: `${dir}/index.js`,
  output: {
    path: `${dir}/dist`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          {loader: ExtractCSSPlugin.loader},
          "css-loader",
          "stylus-loader",
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      } 
    ]
  },
  devServer: {
    stats,
  },
  devtool: "cheap-module-source-map",
  plugins: [extractStyles],
  optimization: {
    minimizer:[
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {
    modules: ['node_modules']
  }
};
