'use strict';

var path = require('path');
var projectRoot = path.join(__dirname, '../../');

module.exports = {
  entry: [
    './index.js',
    '../../src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/}
    ]
  },
  resolve: {
    alias: {
      'react': path.join(projectRoot, 'node_modules/react'),
      'react-dom': path.join(projectRoot, 'node_modules/react-dom'),
      'react-reactive-class': path.join(projectRoot, 'src'),
      'rx': 'rx-lite'
    },
    extensions: ['', '.js']
  }
};
