const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: __dirname,
    filename: 'main.min.js',
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          ecma: 8,
          compress: {
            unused: true,
            dead_code: true,
            pure_getters: false,
            warnings: false,
            conditionals: true,
            comparisons: true,
            sequences: true,
            evaluate: true,
            join_vars: true,
            if_return: true,
          },
          output: {
            comments: false,
          },
          mangle: {
            safari10: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, 'dist'),
    }),
  ],
};
