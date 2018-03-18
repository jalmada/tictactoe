const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

const copy = new CopyWebpackPlugin([{
  from: path.resolve(__dirname,'package.json'),
  to: path.resolve(__dirname,'dist/package.json')
}]);

const uglify = new UglifyJsPlugin({
  test: /\.js($|\?)/i,  
  uglifyOptions: {
    compress: true,
    ie8: true,
    keep_classnames: true,
    keep_fnames: true,
  }
});

const autoversion = new WebpackAutoInject({
  PACKAGE_JSON_PATH: path.resolve(__dirname,'package.json'),
  components: {
      AutoIncreaseVersion: true
  }
})

module.exports = {
  entry: path.resolve(__dirname,'tictactoeprorec.js'),
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
  plugins: [autoversion, uglify, copy]
}