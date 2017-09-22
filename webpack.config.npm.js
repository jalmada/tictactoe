const path = require('path');

module.exports = {
  entry: path.resolve(__dirname,'tictactoepro.js'),
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ],
    rules: [
      { test: /\.css$/, use: ['style-loader','css-loader'] }
    ]   
  }
}