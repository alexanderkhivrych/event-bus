const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: __dirname,
    filename: 'main.min.js',
    libraryTarget: 'umd'
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
};
