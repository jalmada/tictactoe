const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: '/dev/33across',
    filename: 'index-bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}