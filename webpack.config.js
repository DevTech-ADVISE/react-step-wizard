var webpack = require('webpack');
var path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets:['react']},
      },
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
    ],
  },

  entry: './src/react-step-wizard.js',

  output: {
    library: 'ReactPillSelector',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'react-step-wizard.js',
  },

  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    'classnames': {
      root: 'classnames',
      commonjs: 'classnames',
      commonjs2: 'classnames',
      amd: 'classnames',
    },
    'react-pill-selector': {
      root: 'PillSelector',
      commonjs: 'react-pill-selector',
      commonjs2: 'react-pill-selector',
      amd: 'react-pill-selector',
    },
    'react-event-listener': {
      root: 'EventsMixin',
      commonjs: 'react-event-listener',
      commonjs2: 'react-event-listener',
      amd: 'react-event-listener',
    },
  },

  node: {
    Buffer: false
  },

};
