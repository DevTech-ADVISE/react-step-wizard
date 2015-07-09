/* jshint node: true */
var path = require('path');


module.exports = {
  context: path.join(__dirname),
  entry: './example.js',
  devtool: 'source-map',

  output: {
    path: path.join(__dirname),
    filename: 'react-step-wizard.js',
    libraryTarget: 'umd',
    library: 'ReactStepWizard'
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules\/(?!react)/,
        loader: 'babel-loader',
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ]
  }
};
