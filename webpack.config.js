const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: __dirname,
    filename: 'main.min.js',
    libraryTarget: 'commonjs',
    library: '',
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    namedModules: true
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
