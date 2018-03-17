const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const uglify = new UglifyJsPlugin({
  test: /\.js($|\?)/i,  
  uglifyOptions: {
    compress: true,
    ie8: true,
    keep_classnames: true,
    keep_fnames: true,
  }
});

module.exports = {
  entry: path.resolve(__dirname,'tictactoepro.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
    },
  module: {
    
    rules: [
      { test: /\.css$/, use: ['style-loader','css-loader'] },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      } 
    ]
  },
  plugins: [uglify]
}